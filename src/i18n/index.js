import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // Disable legacy for Vue3
  legacy: false,
  // default locale
  locale: 'en',
  // translations
  messages: {
    en: {
		appTitle: "Wang HQ Database",
		homeDescription: "Welcome to the Wang HQ Database. You can view all of the house's files from photos to documents.",
		loginTitle: "Login",
		loginDescription: "Please log in to view all of the house's files. If you don't have an account, please contact the administrator.",
		username: "Username",
		password: "Password",
		home: "Home",
		photos: "Photos",
		submit: "Submit",
    },
    fr: {
		appTitle: "Base de données de Wang HQ",
		homeDescription: "Bienvenue dans la base de données de Wang HQ. Vous pouvez consulter tous les fichiers de la maison, des photos aux documents.",
		loginTitle: "S'identifier",
		loginDescription: "Veuillez vous connecter pour consulter tous les fichiers de la maison. Si vous n'avez pas de compte, veuillez contacter l'administrateur.",
		username: "Nom d'utilisateur",
		password: "Mot de passe",
		home: "Accueil",
		photos: "Photos",
		submit: "Soumettre",
	},
    zh_cn: {
		appTitle: "王HQ数据库",
		homeDescription: "欢迎来到王HQ数据库。您可以查看房屋的所有文件，从照片到文档。",
		loginTitle: "登录",
		loginDescription: "请登录以查看房屋的所有文件。如果您没有帐户，请联系管理员。",
		username: "用户名",
		password: "密码",
		home: "家",
		photos: "照片",
		submit: "提交",
	},
    zh_tw: {
		appTitle: "王HQ數據庫",
		homeDescription: "歡迎來到王HQ數據庫。您可以查看房屋的所有文件，從照片到文檔。",
		loginTitle: "登錄",
		loginDescription: "請登錄以查看房屋的所有文件。如果您沒有帳戶，請聯繫管理員。",
		username: "用戶名",
		password: "密碼",
		home: "家",
		photos: "照片",
		submit: "提交",
	},
  },
})

export default i18n