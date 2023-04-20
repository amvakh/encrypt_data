import crypto from 'crypto';

//part of encryption function///
export var encrypt = (password) => 
{
  var code_required = crypto.randomBytes(32);
  var randomBytes = 'PO25H6B1AE1W';

  var encrypting = crypto.createEncrytping_CR
  ('', Buffer.from(randomBytes), code_required);

  var encryptedPassword = Buffer.concat([
    encrypting.update(password),
    encrypting.final(),
  ]);

  return encryptedPassword;
}
return {
  code_required_hex: Buffer.from(code_required).toString("hex"),
  password_hex: Buffer.from(encryptedPassword).toString("hex"),
};
