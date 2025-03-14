export const messages = {
  // error
  invalidEmail: "メールアドレスが無効です。",
  invalidPassword:
    "パスワードは8文字以上で、数字と大文字を含む必要があります。",
  invalidConfirmPassword: "パスワードが一致しません。",
  tryAgain: "エラーが発生しました。もう一度お試しください。",
  invalidCredentials: "認証情報が無効です。",
  verifyEmail: "ログインする前にメールアドレスを確認してください。",
  serverError: "内部サーバーエラーが発生しました。後ほど再度お試しください。",
  updatedPassword:
    "パスワードを更新しました。新しいパスワードでログインできます。",
  notMatchingUser: "該当するユーザーが見つかりませんでした。",
  userNotFound: "ユーザーが見つかりません。",
  userExists: "ユーザーはすでに存在します",

  // succsess
  successfulLogin: "ログインに成功しました！",
  successfulRegister: "登録が成功しました！",
  successfulCopy: "プレビューURLのコピーに成功しました。",
  sendEmailForResetPassword:
    "パスワードリセットメールを送信しました。受信箱をご確認ください。",
};

export function getMessage(key) {
  return messages[key];
}
