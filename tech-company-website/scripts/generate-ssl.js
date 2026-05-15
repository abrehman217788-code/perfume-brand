const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

const keys = forge.pki.rsa.generateKeyPair(2048);
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01' + Date.now().toString(16);
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [{ name: 'commonName', value: 'localhost' }];
cert.setSubject(attrs);
cert.setIssuer(attrs);

cert.setExtensions([{
  name: 'subjectAltName',
  altNames: [{ type: 2, value: 'localhost' }]
}]);

cert.sign(keys.privateKey, forge.md.sha256.create());

const certDir = path.join(__dirname, '..', 'ssl');
if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

fs.writeFileSync(path.join(certDir, 'server.key'), forge.pki.privateKeyToPem(keys.privateKey));
fs.writeFileSync(path.join(certDir, 'server.crt'), forge.pki.certificateToPem(cert));

console.log('SSL certificates generated in ssl/');