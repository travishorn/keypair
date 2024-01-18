const { generateKeyPair, publicEncrypt, createPrivateKey, privateDecrypt } =
  await import("node:crypto");

const publicKeyEncoding = {
  type: "spki",
  format: "pem",
};

const privateKeyEncoding = {
  type: "pkcs8",
  format: "pem",
  cipher: "aes-256-cbc",
  passphrase: "",
};

const afterGeneration = (err, publicKey, privateKeyMaterial) => {
  if (err) {
    console.error(err);
  } else {
    const privateKey = createPrivateKey({
      ...privateKeyEncoding,
      key: privateKeyMaterial,
    });

    console.log("Public key:", publicKey);
    console.log("Private key material:", privateKeyMaterial);
    console.log(
      "Private key:",
      privateKey.export({
        ...privateKeyEncoding,
      })
    );

    const encryptedMessage = publicEncrypt(publicKey, "Hello, world!");
    console.log("Encrypted message:", encryptedMessage.toString());

    const decryptedMessage = privateDecrypt(privateKey, encryptedMessage);
    console.log("Decrypted message:", decryptedMessage.toString());
  }
};

generateKeyPair(
  "rsa",
  { modulusLength: 4096, publicKeyEncoding, privateKeyEncoding },
  afterGeneration
);
