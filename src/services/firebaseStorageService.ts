import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../components/Firebase/Firebase';

export class FirebaseStorageService {
    /**
     * Upload image to Firebase Storage
     * @param file Image file to upload
     * @param userId User ID for organizing files
     * @param folder Optional folder name (default: 'avatars')
     * @returns Promise<string> - Download URL of uploaded image
     */
    static async uploadImage(file: File, userId: string, folder: string = 'avatars'): Promise<string> {
        try {
            console.log('🚀 Starting Firebase image upload...');
            console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
            console.log('User ID:', userId);
            console.log('Folder:', folder);

            // Validate file
            if (!file.type.startsWith('image/')) {
                throw new Error('File must be an image');
            }

            // Check file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('Image size must be less than 5MB');
            }

            // Create unique filename
            const timestamp = Date.now();
            const fileExtension = file.name.split('.').pop();
            const fileName = `${userId}_${timestamp}.${fileExtension}`;
            const filePath = `${folder}/${fileName}`;

            console.log('📁 Upload path:', filePath);

            // Create storage reference
            const storageRef = ref(storage, filePath);

            // Upload file
            console.log('⬆️ Uploading to Firebase...');
            const snapshot = await uploadBytes(storageRef, file);
            console.log('✅ Upload successful:', snapshot.metadata.name);

            // Get download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('🔗 Download URL:', downloadURL);

            return downloadURL;
        } catch (error) {
            console.error('❌ Firebase upload error:', error);
            if (error instanceof Error) {
                throw new Error(`Upload failed: ${error.message}`);
            }
            throw new Error('Upload failed: Unknown error');
        }
    }

    /**
     * Delete image from Firebase Storage
     * @param imageUrl Download URL of the image to delete
     * @returns Promise<void>
     */
    static async deleteImage(imageUrl: string): Promise<void> {
        try {
            console.log('🗑️ Deleting image from Firebase:', imageUrl);

            // Create reference from URL
            const imageRef = ref(storage, imageUrl);

            // Delete the file
            await deleteObject(imageRef);
            console.log('✅ Image deleted successfully');
        } catch (error) {
            console.error('❌ Firebase delete error:', error);
            // Don't throw error if file doesn't exist
            if (error instanceof Error && error.message.includes('object-not-found')) {
                console.log('ℹ️ Image already deleted or doesn\'t exist');
                return;
            }
            throw error;
        }
    }

    /**
     * Get file extension from filename
     * @param filename File name
     * @returns string File extension
     */
    static getFileExtension(filename: string): string {
        return filename.split('.').pop() || '';
    }

    /**
     * Format file size to readable string
     * @param bytes File size in bytes
     * @returns string Formatted file size
     */
    static formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    /**
     * Upload document to Firebase Storage (PDF, DOC, DOCX)
     * @param file Document file to upload
     * @param userId User ID for organizing files
     * @param folder Optional folder name (default: 'documents')
     * @returns Promise<string> - Download URL of uploaded document
     */
    static async uploadDocument(file: File, userId: string, folder: string = 'documents'): Promise<string> {
        try {
            console.log('🚀 Starting Firebase document upload...');
            console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type);
            console.log('User ID:', userId);
            console.log('Folder:', folder);

            // Validate file
            const validation = this.validateDocumentFile(file);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Create unique filename
            const timestamp = Date.now();
            const fileExtension = file.name.split('.').pop();
            const fileName = `${userId}_${timestamp}.${fileExtension}`;
            const filePath = `${folder}/${fileName}`;

            console.log('📁 Upload path:', filePath);

            // Create storage reference
            const storageRef = ref(storage, filePath);

            // Upload file
            console.log('⬆️ Uploading document to Firebase...');
            const snapshot = await uploadBytes(storageRef, file);
            console.log('✅ Document upload successful:', snapshot.metadata.name);

            // Get download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('🔗 Document download URL:', downloadURL);

            return downloadURL;
        } catch (error) {
            console.error('❌ Firebase document upload error:', error);
            if (error instanceof Error) {
                throw new Error(`Document upload failed: ${error.message}`);
            }
            throw new Error('Document upload failed: Unknown error');
        }
    }

    /**
     * Validate image file
     * @param file File to validate
     * @returns boolean True if valid
     */
    static validateImageFile(file: File): { valid: boolean; error?: string } {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            return { valid: false, error: 'File must be an image (JPG, PNG, GIF, etc.)' };
        }

        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return { valid: false, error: 'Image size must be less than 5MB' };
        }

        // Check image dimensions (optional - can be added later)
        return { valid: true };
    }

    /**
     * Validate document file (PDF, DOC, DOCX)
     * @param file File to validate
     * @returns object Validation result
     */
    static validateDocumentFile(file: File): { valid: boolean; error?: string } {
        // Allowed document types
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        // Check file type and extension
        if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
            return { valid: false, error: 'File must be PDF, DOC, or DOCX format' };
        }

        // Check file size (max 10MB for documents)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return { valid: false, error: 'Document size must be less than 10MB' };
        }

        return { valid: true };
    }
}

export default FirebaseStorageService; 