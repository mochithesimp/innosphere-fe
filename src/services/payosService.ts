import axios from 'axios';

// PayOS configuration - replace with your actual keys
const PAYOS_CONFIG = {
    clientId: import.meta.env.VITE_PAYOS_CLIENT_ID || '',
    apiKey: import.meta.env.VITE_PAYOS_API_KEY || '',
    checksumKey: import.meta.env.VITE_PAYOS_CHECKSUM_KEY || '',
    baseUrl: 'https://api-merchant.payos.vn'
};

export interface PayOSPaymentData {
    orderCode: number;
    amount: number;
    description: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    returnUrl: string;
    cancelUrl: string;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
}

export interface PayOSPaymentResponse {
    code: string;
    desc: string;
    data?: {
        bin: string;
        accountNumber: string;
        accountName: string;
        amount: number;
        description: string;
        orderCode: number;
        currency: string;
        paymentLinkId: string;
        status: string;
        checkoutUrl: string;
        qrCode: string;
    };
    signature?: string;
}

export interface PayOSVerifyResponse {
    code: string;
    desc: string;
    data?: {
        orderCode: number;
        amount: number;
        description: string;
        accountNumber: string;
        reference: string;
        transactionDateTime: string;
        currency: string;
        paymentLinkId: string;
        code: string;
        desc: string;
        status?: string; // Payment status: PENDING, PAID, CANCELLED, etc.
        counterAccountBankId: string;
        counterAccountBankName: string;
        counterAccountName: string;
        counterAccountNumber: string;
        virtualAccountName: string;
        virtualAccountNumber: string;
    };
    signature?: string;
}

class PayOSService {
    private async generateSignature(data: string): Promise<string> {
        // This uses Web Crypto API for proper HMAC-SHA256 signature generation
        try {
            const encoder = new TextEncoder();
            const keyData = encoder.encode(PAYOS_CONFIG.checksumKey);
            const dataToSign = encoder.encode(data);

            // Import the key for HMAC-SHA256
            const key = await crypto.subtle.importKey(
                'raw',
                keyData,
                { name: 'HMAC', hash: 'SHA-256' },
                false,
                ['sign']
            );

            // Generate the signature
            const signature = await crypto.subtle.sign('HMAC', key, dataToSign);

            // Convert to hex string
            const hashArray = Array.from(new Uint8Array(signature));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            console.log('🔐 Generated signature for data:', data);
            console.log('🔐 Signature:', hashHex);

            return hashHex;
        } catch (error) {
            console.error('Signature generation error:', error);
            // Fallback: return empty string if signature generation fails
            return '';
        }
    }

    async createPaymentLink(paymentData: PayOSPaymentData): Promise<PayOSPaymentResponse> {
        try {
            // Check if credentials are configured
            if (!PAYOS_CONFIG.clientId || !PAYOS_CONFIG.apiKey) {
                throw new Error('PayOS credentials not configured. Please check your environment variables.');
            }
            // Create data string for signature - sorted alphabetically as per PayOS docs
            const signatureData = `amount=${paymentData.amount}&cancelUrl=${paymentData.cancelUrl}&description=${paymentData.description}&orderCode=${paymentData.orderCode}&returnUrl=${paymentData.returnUrl}`;

            // Generate signature
            const signature = await this.generateSignature(signatureData);

            const requestData = {
                orderCode: paymentData.orderCode,
                amount: paymentData.amount,
                description: paymentData.description,
                returnUrl: paymentData.returnUrl,
                cancelUrl: paymentData.cancelUrl,
                signature: signature
            };

            console.log('🔍 PayOS Request Data:', JSON.stringify(requestData, null, 2));
            console.log('🔍 PayOS Config:', {
                clientId: PAYOS_CONFIG.clientId ? '***SET***' : 'MISSING',
                apiKey: PAYOS_CONFIG.apiKey ? '***SET***' : 'MISSING',
                baseUrl: PAYOS_CONFIG.baseUrl
            });

            const response = await axios.post(
                `${PAYOS_CONFIG.baseUrl}/v2/payment-requests`,
                requestData,
                {
                    headers: {
                        'x-client-id': PAYOS_CONFIG.clientId,
                        'x-api-key': PAYOS_CONFIG.apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('✅ PayOS Response:', response.data);

            // PayOS returns 200 but with internal error codes
            if (response.data.code !== '00' && response.data.code !== 0) {
                throw new Error(`PayOS Error ${response.data.code}: ${response.data.desc || response.data.message}`);
            }

            // PayOS success! Return the data
            console.log('🎉 PayOS Success! QR Code available:', !!response.data.data?.qrCode);
            return response.data;
        } catch (error: unknown) {
            console.error('❌ PayOS payment creation error:', error);

            // Log detailed error information
            const axiosError = error as { response?: { status: number; data: { message?: string; desc?: string }; headers: unknown }; request?: unknown; message?: string };

            if (axiosError.response) {
                console.error('📋 Response Status:', axiosError.response.status);
                console.error('📋 Response Data:', axiosError.response.data);
                console.error('📋 Response Headers:', axiosError.response.headers);

                // Return specific error message from PayOS
                const errorMsg = axiosError.response.data?.message || axiosError.response.data?.desc || `API Error ${axiosError.response.status}`;
                throw new Error(`PayOS API Error: ${errorMsg}`);
            } else if (axiosError.request) {
                console.error('📋 No Response Received:', axiosError.request);
                throw new Error('PayOS API: No response received (network error)');
            } else {
                console.error('📋 Request Setup Error:', axiosError.message);
                throw new Error(`PayOS Request Error: ${axiosError.message || 'Unknown error'}`);
            }
        }
    }

    async verifyPaymentWebhookData(webhookData: { orderCode: number;[key: string]: unknown }): Promise<PayOSVerifyResponse> {
        try {
            const response = await axios.post(
                `${PAYOS_CONFIG.baseUrl}/v2/payment-requests/${webhookData.orderCode}/verify`,
                webhookData,
                {
                    headers: {
                        'x-client-id': PAYOS_CONFIG.clientId,
                        'x-api-key': PAYOS_CONFIG.apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('PayOS verification error:', error);
            throw new Error('Failed to verify PayOS payment');
        }
    }

    async getPaymentInfo(orderCode: number): Promise<PayOSVerifyResponse> {
        try {
            const response = await axios.get(
                `${PAYOS_CONFIG.baseUrl}/v2/payment-requests/${orderCode}`,
                {
                    headers: {
                        'x-client-id': PAYOS_CONFIG.clientId,
                        'x-api-key': PAYOS_CONFIG.apiKey,
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('PayOS get payment info error:', error);
            throw new Error('Failed to get PayOS payment info');
        }
    }

    generateOrderCode(): number {
        return Math.floor(Math.random() * 1000000) + Date.now();
    }
}

export default new PayOSService(); 