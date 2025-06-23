import PayPalService from './paypalService';
import PayOSService from './payosService';

export interface SubscriptionData {
    amountPaid: number;
    startDate: string;
    paymentStatus: string;
}

class PaymentReceiptService {
    // Detect payment provider based on transaction ID format
    private detectPaymentProvider(transactionId: string): 'paypal' | 'payos' {
        // PayOS orderCodes are pure numbers
        if (/^\d+$/.test(transactionId)) {
            return 'payos';
        }
        // PayPal transaction IDs contain letters and numbers
        return 'paypal';
    }

    // Download receipt for any payment provider
    async downloadReceipt(
        transactionId: string,
        employerName: string,
        packageName?: string,
        subscriptionData?: SubscriptionData
    ): Promise<void> {
        const provider = this.detectPaymentProvider(transactionId);

        console.log(`🔍 Detected payment provider: ${provider.toUpperCase()} for transaction: ${transactionId}`);

        try {
            if (provider === 'payos') {
                // Use PayOS service
                await PayOSService.downloadPayOSReceipt(
                    transactionId,
                    employerName,
                    packageName,
                    subscriptionData
                );
            } else {
                // Use PayPal service
                await PayPalService.downloadTransactionReceipt(
                    transactionId,
                    employerName,
                    packageName,
                    subscriptionData
                );
            }
        } catch (error) {
            console.error(`${provider.toUpperCase()} receipt download failed:`, error);
            throw error;
        }
    }

    // Get provider name for display
    getProviderName(transactionId: string): string {
        const provider = this.detectPaymentProvider(transactionId);
        return provider === 'payos' ? 'PayOS' : 'PayPal';
    }

    // Check if transaction ID is valid
    isValidTransactionId(transactionId: string): boolean {
        if (!transactionId || transactionId.trim() === '') {
            return false;
        }

        // PayOS: must be numbers only
        if (/^\d+$/.test(transactionId)) {
            return true;
        }

        // PayPal: must contain both letters and numbers, typically 17 chars
        if (/^[A-Z0-9]{10,20}$/.test(transactionId)) {
            return true;
        }

        return false;
    }
}

export default new PaymentReceiptService(); 