export const messages = {
  invalidEmail: "メールアドレスが無効です。",
  invalidPassword: "パスワードは8文字以上で、数字と大文字を含む必要があります。",
  invalidConfirmPassword: "パスワードが一致しません。",
  tryAgain: "エラーが発生しました。もう一度お試しください。",
  successfulLogin: "ログインに成功しました！",
  invalidCredentials: "認証情報が無効です。",
  verifyEmail: "ログインする前にメールアドレスを確認してください。",
  serverError: "内部サーバーエラーが発生しました。後ほど再度お試しください。",
  successfulCopy: "プレビューURLのコピーに成功しました。",
  updatedPassword: "パスワードを更新しました。新しいパスワードでログインできます。",
  notMatchingUser: "該当するユーザーが見つかりませんでした。",
  sendEmailForResetPassword: "パスワードリセットメールを送信しました。受信箱をご確認ください。",
  userNotFound: "ユーザーが見つかりません。",
  userExists: "ユーザーはすでに存在します",
};

export function getMessage(key) {
  return messages[key];
}