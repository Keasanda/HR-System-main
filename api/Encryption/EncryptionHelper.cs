using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public static class EncryptionHelper
{
    // Load the encryption key from the environment variable
    private static readonly string encryptionKey = Environment.GetEnvironmentVariable("ENCRYPTION_KEY");

    public static string EncryptString(string plainText)
    {
        if (string.IsNullOrEmpty(encryptionKey))
            throw new InvalidOperationException("Encryption key is not configured in the environment.");

        byte[] keyBytes = Encoding.UTF8.GetBytes(encryptionKey);
        
        using (var aes = Aes.Create())
        {
            aes.Key = keyBytes;
            aes.GenerateIV();
            byte[] iv = aes.IV;

            using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
            using (var ms = new MemoryStream())
            {
                ms.Write(iv, 0, iv.Length);
                using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                using (var sw = new StreamWriter(cs))
                {
                    sw.Write(plainText);
                }
                return Convert.ToBase64String(ms.ToArray());
            }
        }
    }

    public static string DecryptString(string cipherText)
    {
        if (string.IsNullOrEmpty(encryptionKey))
            throw new InvalidOperationException("Encryption key is not configured in the environment.");

        byte[] fullCipher = Convert.FromBase64String(cipherText);
        
        using (var aes = Aes.Create())
        {
            byte[] iv = new byte[aes.BlockSize / 8];
            byte[] cipher = new byte[fullCipher.Length - iv.Length];

            Array.Copy(fullCipher, iv, iv.Length);
            Array.Copy(fullCipher, iv.Length, cipher, 0, cipher.Length);

            aes.Key = Encoding.UTF8.GetBytes(encryptionKey);
            aes.IV = iv;

            using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
            using (var ms = new MemoryStream(cipher))
            using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
            using (var sr = new StreamReader(cs))
            {
                return sr.ReadToEnd();
            }
        }
    }
}
