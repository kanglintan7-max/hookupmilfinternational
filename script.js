/**
 * Amara — simple front-end demo for a dating site.
 * No fake social proof, no manufactured urgency: everything shown reflects
 * real app state (currently local/in-memory since there is no backend wired up yet).
 */

const state = {
    name: "",
    email: "",
    gender: "",
    targetOTP: "",
    tier: "free",
    membershipId: "",
};

let currentLang = localStorage.getItem('amara_lang') || 'en';

// Non-translated numeric/plan configuration
const TIER_META = {
    free: { prefix: "FRE", channelAccess: 2, roomAccess: 0, priceValue: "€0" },
    silver: { prefix: "SLV", channelAccess: 5, roomAccess: 3, priceValue: "€9.99" },
    gold: { prefix: "GLD", channelAccess: 7, roomAccess: 7, priceValue: "€19.99" },
    platinum: { prefix: "PLT", channelAccess: 7, roomAccess: 10, priceValue: "€34.99" },
};
const TIER_ORDER = ["free", "silver", "gold", "platinum"];
const CHANNEL_COUNT = 7;
const ROOM_COUNT = 10;

/** Translations **/
const I18N = {
    en: {
        auth_title: "Welcome back", auth_subtitle: "Sign in to continue to your account.",
        login_email_ph: "Email Address", login_pass_ph: "Password", signin_btn: "Sign In",
        no_account: "No account?", create_one: "Create one",
        register_title: "Create your profile", register_subtitle: "Tell us a bit about yourself to get started.",
        reg_name_ph: "Full Name", reg_email_ph: "Email Address", reg_phone_ph: "Phone Number",
        reg_gender_default: "Select Gender", reg_gender_male: "Male", reg_gender_female: "Female",
        reg_gender_nonbinary: "Non-binary", reg_gender_prefer: "Prefer not to say", continue_btn: "Continue",
        verify_title: "Verify your email",
        verify_subtitle: "We sent a 4-digit code to your email. For this demo, it's shown below — enter it to continue.",
        otp_ph: "Enter the 4-digit code", verify_btn: "Verify",
        verify_mismatch: "That code doesn't match. Please check and try again.",
        photo_title: "Add a profile photo",
        photo_subtitle: "Optional — you can always add or change this later in your settings.",
        save_continue_btn: "Save & Continue", skip_for_now: "Skip for now",
        welcome_label: "Welcome,", friend_fallback: "friend", manage_plan_btn: "Manage Plan",
        regional_channels_title: "Regional Channels", regional_channels_hint: "Join a channel to meet people from that region.",
        private_rooms_title: "Private Rooms",
        private_rooms_hint: "Smaller, focused spaces for closer conversations. Availability depends on your plan.",
        open_channel: "Open channel", upgrade_unlock: "🔒 Upgrade to unlock", available: "Available",
        room_label: "Room", back_to_lobby: "← Back to Lobby",
        channel_empty: "No members here yet — be the first to say hello when this channel opens up.",
        room_joined: "You've joined {room}. This space is currently quiet — invite someone or check back later.",
        plan_line: "{tier} plan", member_suffix: "MEMBER",
        plans_title: "Choose your plan", plans_subtitle: "Upgrade anytime. No hidden fees, cancel whenever you like.",
        back_to_lobby_btn: "Back to Lobby", current_plan_btn: "Current Plan", choose_prefix: "Choose", per_month: "/ month",
        account_title: "You're all set 🎉", plan_label: "Plan:", membership_id_label: "Membership ID:",
        account_subtitle: "Your membership ID identifies your plan across the app. You can view or change your plan anytime from your account settings.",
        continue_lobby_btn: "Continue to Lobby",
        reg_missing_fields: "Please fill in your name, email, and gender to continue.",
        channels: ["Asia", "Europe", "North America", "South America", "Africa", "Australia / Oceania", "Antarctica"],
        tiers: {
            free: { label: "Free", calls: "None", features: ["Access to 2 regional channels", "Text messaging only", "Standard profile visibility"] },
            silver: { label: "Silver", calls: "None", features: ["Access to 5 regional channels", "3 private rooms unlocked", "Unlimited text messaging", "Silver membership badge"] },
            gold: { label: "Gold", calls: "Voice calls", features: ["Access to all 7 regional channels", "7 private rooms unlocked", "Voice calls enabled", "Priority profile visibility"] },
            platinum: { label: "Platinum", calls: "Voice & video calls", features: ["Access to all 7 regional channels", "All 10 private rooms unlocked", "Voice & video calls enabled", "Top profile visibility"] },
        },
    },
    tl: {
        auth_title: "Maligayang pagbabalik", auth_subtitle: "Mag-sign in para magpatuloy sa iyong account.",
        login_email_ph: "Email Address", login_pass_ph: "Password", signin_btn: "Mag-sign In",
        no_account: "Wala pang account?", create_one: "Gumawa ng isa",
        register_title: "Gawin ang iyong profile", register_subtitle: "Sabihin sa amin ang kaunti tungkol sa iyong sarili para makapagsimula.",
        reg_name_ph: "Buong Pangalan", reg_email_ph: "Email Address", reg_phone_ph: "Numero ng Telepono",
        reg_gender_default: "Piliin ang Kasarian", reg_gender_male: "Lalaki", reg_gender_female: "Babae",
        reg_gender_nonbinary: "Non-binary", reg_gender_prefer: "Ayaw sabihin", continue_btn: "Magpatuloy",
        verify_title: "I-verify ang iyong email",
        verify_subtitle: "Nagpadala kami ng 4-digit code sa iyong email. Para sa demo na ito, ipinapakita ito sa ibaba — ilagay ito para magpatuloy.",
        otp_ph: "Ilagay ang 4-digit code", verify_btn: "I-verify",
        verify_mismatch: "Hindi tugma ang code. Pakisuri at subukang muli.",
        photo_title: "Magdagdag ng profile photo",
        photo_subtitle: "Opsyonal — puwede mong idagdag o palitan ito anumang oras sa iyong settings.",
        save_continue_btn: "I-save at Magpatuloy", skip_for_now: "Laktawan muna",
        welcome_label: "Maligayang pagdating,", friend_fallback: "kaibigan", manage_plan_btn: "Pamahalaan ang Plano",
        regional_channels_title: "Mga Panrehiyong Channel", regional_channels_hint: "Sumali sa isang channel para makilala ang mga tao mula sa rehiyong iyon.",
        private_rooms_title: "Mga Pribadong Room",
        private_rooms_hint: "Mas maliliit at pokus na espasyo para sa mas malalapit na usapan. Ang availability ay depende sa iyong plano.",
        open_channel: "Bukas na channel", upgrade_unlock: "🔒 I-upgrade para ma-unlock", available: "Available",
        room_label: "Room", back_to_lobby: "← Bumalik sa Lobby",
        channel_empty: "Wala pang miyembro dito — maging una kang bumati kapag nabuksan na ang channel na ito.",
        room_joined: "Sumali ka sa {room}. Tahimik pa ang espasyong ito — mag-imbita ng iba o bumalik mamaya.",
        plan_line: "Planong {tier}", member_suffix: "MIYEMBRO",
        plans_title: "Piliin ang iyong plano", plans_subtitle: "Mag-upgrade anumang oras. Walang tagong bayad, kanselahin kahit kailan.",
        back_to_lobby_btn: "Bumalik sa Lobby", current_plan_btn: "Kasalukuyang Plano", choose_prefix: "Piliin ang", per_month: "/ buwan",
        account_title: "Handa ka na 🎉", plan_label: "Plano:", membership_id_label: "Membership ID:",
        account_subtitle: "Kinikilala ng iyong Membership ID ang iyong plano sa buong app. Puwede mong tingnan o palitan ang iyong plano anumang oras sa settings ng account.",
        continue_lobby_btn: "Magpatuloy sa Lobby",
        reg_missing_fields: "Pakikumpleto ang pangalan, email, at kasarian para magpatuloy.",
        channels: ["Asya", "Europa", "Hilagang Amerika", "Timog Amerika", "Aprika", "Australia / Oceania", "Antartika"],
        tiers: {
            free: { label: "Libre", calls: "Wala", features: ["Access sa 2 panrehiyong channel", "Text messaging lamang", "Standard na profile visibility"] },
            silver: { label: "Silver", calls: "Wala", features: ["Access sa 5 panrehiyong channel", "3 pribadong room na naka-unlock", "Unlimited text messaging", "Silver membership badge"] },
            gold: { label: "Gold", calls: "Voice calls", features: ["Access sa lahat ng 7 panrehiyong channel", "7 pribadong room na naka-unlock", "Naka-enable ang voice calls", "Priority profile visibility"] },
            platinum: { label: "Platinum", calls: "Voice & video calls", features: ["Access sa lahat ng 7 panrehiyong channel", "Lahat ng 10 pribadong room naka-unlock", "Naka-enable ang voice & video calls", "Pinakamataas na profile visibility"] },
        },
    },
    zh: {
        auth_title: "欢迎回来", auth_subtitle: "登录以继续访问您的账户。",
        login_email_ph: "电子邮箱", login_pass_ph: "密码", signin_btn: "登录",
        no_account: "还没有账户？", create_one: "立即注册",
        register_title: "创建您的资料", register_subtitle: "告诉我们一些关于您的信息以开始使用。",
        reg_name_ph: "姓名", reg_email_ph: "电子邮箱", reg_phone_ph: "电话号码",
        reg_gender_default: "选择性别", reg_gender_male: "男", reg_gender_female: "女",
        reg_gender_nonbinary: "非二元性别", reg_gender_prefer: "不愿透露", continue_btn: "继续",
        verify_title: "验证您的邮箱",
        verify_subtitle: "我们已向您的邮箱发送了一个4位数验证码。在此演示中，验证码显示在下方——输入以继续。",
        otp_ph: "输入4位数验证码", verify_btn: "验证",
        verify_mismatch: "验证码不匹配，请检查后重试。",
        photo_title: "添加个人照片", photo_subtitle: "可选——您可以随时在设置中添加或更改。",
        save_continue_btn: "保存并继续", skip_for_now: "暂时跳过",
        welcome_label: "欢迎，", friend_fallback: "朋友", manage_plan_btn: "管理套餐",
        regional_channels_title: "地区频道", regional_channels_hint: "加入一个频道，结识来自该地区的人。",
        private_rooms_title: "私人房间", private_rooms_hint: "更私密、更专注的交流空间。可用性取决于您的套餐。",
        open_channel: "开放频道", upgrade_unlock: "🔒 升级以解锁", available: "可用",
        room_label: "房间", back_to_lobby: "← 返回大厅",
        channel_empty: "这里还没有成员——当该频道开放时，成为第一个打招呼的人吧。",
        room_joined: "您已加入{room}。这里目前很安静——邀请他人或稍后再来看看。",
        plan_line: "{tier}套餐", member_suffix: "会员",
        plans_title: "选择您的套餐", plans_subtitle: "随时升级。没有隐藏费用，随时可以取消。",
        back_to_lobby_btn: "返回大厅", current_plan_btn: "当前套餐", choose_prefix: "选择", per_month: "/ 月",
        account_title: "一切就绪 🎉", plan_label: "套餐：", membership_id_label: "会员编号：",
        account_subtitle: "您的会员编号用于在应用中标识您的套餐。您可以随时在账户设置中查看或更改套餐。",
        continue_lobby_btn: "继续前往大厅",
        reg_missing_fields: "请填写姓名、邮箱和性别以继续。",
        channels: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "澳大利亚 / 大洋洲", "南极洲"],
        tiers: {
            free: { label: "免费", calls: "无", features: ["可访问2个地区频道", "仅支持文字聊天", "标准资料可见度"] },
            silver: { label: "白银", calls: "无", features: ["可访问5个地区频道", "解锁3个私人房间", "无限文字聊天", "白银会员徽章"] },
            gold: { label: "黄金", calls: "语音通话", features: ["可访问全部7个地区频道", "解锁7个私人房间", "支持语音通话", "优先资料可见度"] },
            platinum: { label: "铂金", calls: "语音和视频通话", features: ["可访问全部7个地区频道", "解锁全部10个私人房间", "支持语音和视频通话", "最高资料可见度"] },
        },
    },
    es: {
        auth_title: "Bienvenido de nuevo", auth_subtitle: "Inicia sesión para continuar a tu cuenta.",
        login_email_ph: "Correo electrónico", login_pass_ph: "Contraseña", signin_btn: "Iniciar sesión",
        no_account: "¿No tienes cuenta?", create_one: "Crear una",
        register_title: "Crea tu perfil", register_subtitle: "Cuéntanos un poco sobre ti para comenzar.",
        reg_name_ph: "Nombre completo", reg_email_ph: "Correo electrónico", reg_phone_ph: "Número de teléfono",
        reg_gender_default: "Selecciona el género", reg_gender_male: "Hombre", reg_gender_female: "Mujer",
        reg_gender_nonbinary: "No binario", reg_gender_prefer: "Prefiero no decirlo", continue_btn: "Continuar",
        verify_title: "Verifica tu correo",
        verify_subtitle: "Enviamos un código de 4 dígitos a tu correo. Para esta demo, se muestra abajo — ingrésalo para continuar.",
        otp_ph: "Ingresa el código de 4 dígitos", verify_btn: "Verificar",
        verify_mismatch: "Ese código no coincide. Verifícalo e inténtalo de nuevo.",
        photo_title: "Agrega una foto de perfil",
        photo_subtitle: "Opcional — puedes agregarla o cambiarla más tarde en tu configuración.",
        save_continue_btn: "Guardar y continuar", skip_for_now: "Omitir por ahora",
        welcome_label: "Bienvenido,", friend_fallback: "amigo/a", manage_plan_btn: "Gestionar plan",
        regional_channels_title: "Canales regionales", regional_channels_hint: "Únete a un canal para conocer gente de esa región.",
        private_rooms_title: "Salas privadas",
        private_rooms_hint: "Espacios más pequeños y enfocados para conversaciones más cercanas. La disponibilidad depende de tu plan.",
        open_channel: "Canal abierto", upgrade_unlock: "🔒 Mejora tu plan para desbloquear", available: "Disponible",
        room_label: "Sala", back_to_lobby: "← Volver al lobby",
        channel_empty: "Aún no hay miembros aquí — sé el primero en saludar cuando este canal se active.",
        room_joined: "Te uniste a {room}. Este espacio está tranquilo por ahora — invita a alguien o vuelve más tarde.",
        plan_line: "Plan {tier}", member_suffix: "MIEMBRO",
        plans_title: "Elige tu plan", plans_subtitle: "Mejora cuando quieras. Sin cargos ocultos, cancela cuando gustes.",
        back_to_lobby_btn: "Volver al lobby", current_plan_btn: "Plan actual", choose_prefix: "Elegir", per_month: "/ mes",
        account_title: "Todo listo 🎉", plan_label: "Plan:", membership_id_label: "ID de membresía:",
        account_subtitle: "Tu ID de membresía identifica tu plan en toda la app. Puedes ver o cambiar tu plan cuando quieras desde la configuración de tu cuenta.",
        continue_lobby_btn: "Continuar al lobby",
        reg_missing_fields: "Completa tu nombre, correo y género para continuar.",
        channels: ["Asia", "Europa", "Norteamérica", "Sudamérica", "África", "Australia / Oceanía", "Antártida"],
        tiers: {
            free: { label: "Gratis", calls: "Ninguna", features: ["Acceso a 2 canales regionales", "Solo mensajes de texto", "Visibilidad de perfil estándar"] },
            silver: { label: "Plata", calls: "Ninguna", features: ["Acceso a 5 canales regionales", "3 salas privadas desbloqueadas", "Mensajes de texto ilimitados", "Insignia de miembro Plata"] },
            gold: { label: "Oro", calls: "Llamadas de voz", features: ["Acceso a los 7 canales regionales", "7 salas privadas desbloqueadas", "Llamadas de voz habilitadas", "Visibilidad de perfil prioritaria"] },
            platinum: { label: "Platino", calls: "Llamadas de voz y video", features: ["Acceso a los 7 canales regionales", "Las 10 salas privadas desbloqueadas", "Llamadas de voz y video habilitadas", "Máxima visibilidad de perfil"] },
        },
    },
    fr: {
        auth_title: "Bienvenue", auth_subtitle: "Connectez-vous pour accéder à votre compte.",
        login_email_ph: "Adresse e-mail", login_pass_ph: "Mot de passe", signin_btn: "Se connecter",
        no_account: "Pas de compte ?", create_one: "Créez-en un",
        register_title: "Créez votre profil", register_subtitle: "Parlez-nous un peu de vous pour commencer.",
        reg_name_ph: "Nom complet", reg_email_ph: "Adresse e-mail", reg_phone_ph: "Numéro de téléphone",
        reg_gender_default: "Sélectionnez le genre", reg_gender_male: "Homme", reg_gender_female: "Femme",
        reg_gender_nonbinary: "Non-binaire", reg_gender_prefer: "Je préfère ne pas préciser", continue_btn: "Continuer",
        verify_title: "Vérifiez votre e-mail",
        verify_subtitle: "Nous avons envoyé un code à 4 chiffres à votre e-mail. Pour cette démo, il est affiché ci-dessous — saisissez-le pour continuer.",
        otp_ph: "Entrez le code à 4 chiffres", verify_btn: "Vérifier",
        verify_mismatch: "Ce code ne correspond pas. Veuillez vérifier et réessayer.",
        photo_title: "Ajoutez une photo de profil",
        photo_subtitle: "Facultatif — vous pouvez l'ajouter ou la modifier plus tard dans vos paramètres.",
        save_continue_btn: "Enregistrer et continuer", skip_for_now: "Passer pour l'instant",
        welcome_label: "Bienvenue,", friend_fallback: "ami(e)", manage_plan_btn: "Gérer l'abonnement",
        regional_channels_title: "Canaux régionaux", regional_channels_hint: "Rejoignez un canal pour rencontrer des personnes de cette région.",
        private_rooms_title: "Salons privés",
        private_rooms_hint: "Des espaces plus restreints pour des conversations plus intimes. La disponibilité dépend de votre abonnement.",
        open_channel: "Canal ouvert", upgrade_unlock: "🔒 Passez à un forfait supérieur pour débloquer", available: "Disponible",
        room_label: "Salon", back_to_lobby: "← Retour au hall",
        channel_empty: "Aucun membre ici pour l'instant — soyez le premier à dire bonjour quand ce canal s'animera.",
        room_joined: "Vous avez rejoint {room}. Cet espace est calme pour le moment — invitez quelqu'un ou revenez plus tard.",
        plan_line: "Forfait {tier}", member_suffix: "MEMBRE",
        plans_title: "Choisissez votre forfait", plans_subtitle: "Changez de forfait à tout moment. Aucun frais caché, annulez quand vous voulez.",
        back_to_lobby_btn: "Retour au hall", current_plan_btn: "Forfait actuel", choose_prefix: "Choisir", per_month: "/ mois",
        account_title: "Tout est prêt 🎉", plan_label: "Forfait :", membership_id_label: "ID de membre :",
        account_subtitle: "Votre ID de membre identifie votre forfait dans toute l'application. Vous pouvez consulter ou modifier votre forfait à tout moment depuis les paramètres de votre compte.",
        continue_lobby_btn: "Continuer vers le hall",
        reg_missing_fields: "Veuillez renseigner votre nom, e-mail et genre pour continuer.",
        channels: ["Asie", "Europe", "Amérique du Nord", "Amérique du Sud", "Afrique", "Australie / Océanie", "Antarctique"],
        tiers: {
            free: { label: "Gratuit", calls: "Aucun", features: ["Accès à 2 canaux régionaux", "Messagerie texte uniquement", "Visibilité de profil standard"] },
            silver: { label: "Argent", calls: "Aucun", features: ["Accès à 5 canaux régionaux", "3 salons privés débloqués", "Messagerie texte illimitée", "Badge de membre Argent"] },
            gold: { label: "Or", calls: "Appels vocaux", features: ["Accès aux 7 canaux régionaux", "7 salons privés débloqués", "Appels vocaux activés", "Visibilité de profil prioritaire"] },
            platinum: { label: "Platine", calls: "Appels vocaux et vidéo", features: ["Accès aux 7 canaux régionaux", "Les 10 salons privés débloqués", "Appels vocaux et vidéo activés", "Visibilité de profil maximale"] },
        },
    },
    de: {
        auth_title: "Willkommen zurück", auth_subtitle: "Melde dich an, um fortzufahren.",
        login_email_ph: "E-Mail-Adresse", login_pass_ph: "Passwort", signin_btn: "Anmelden",
        no_account: "Noch kein Konto?", create_one: "Jetzt erstellen",
        register_title: "Erstelle dein Profil", register_subtitle: "Erzähl uns etwas über dich, um loszulegen.",
        reg_name_ph: "Vollständiger Name", reg_email_ph: "E-Mail-Adresse", reg_phone_ph: "Telefonnummer",
        reg_gender_default: "Geschlecht auswählen", reg_gender_male: "Männlich", reg_gender_female: "Weiblich",
        reg_gender_nonbinary: "Nichtbinär", reg_gender_prefer: "Möchte ich nicht angeben", continue_btn: "Weiter",
        verify_title: "Bestätige deine E-Mail",
        verify_subtitle: "Wir haben einen 4-stelligen Code an deine E-Mail gesendet. In dieser Demo wird er unten angezeigt — gib ihn ein, um fortzufahren.",
        otp_ph: "4-stelligen Code eingeben", verify_btn: "Bestätigen",
        verify_mismatch: "Der Code stimmt nicht überein. Bitte überprüfen und erneut versuchen.",
        photo_title: "Profilfoto hinzufügen",
        photo_subtitle: "Optional — du kannst es später jederzeit in den Einstellungen hinzufügen oder ändern.",
        save_continue_btn: "Speichern & Weiter", skip_for_now: "Vorerst überspringen",
        welcome_label: "Willkommen,", friend_fallback: "Freund/in", manage_plan_btn: "Abo verwalten",
        regional_channels_title: "Regionale Kanäle", regional_channels_hint: "Tritt einem Kanal bei, um Leute aus dieser Region kennenzulernen.",
        private_rooms_title: "Private Räume",
        private_rooms_hint: "Kleinere, fokussierte Räume für vertrautere Gespräche. Verfügbarkeit hängt von deinem Plan ab.",
        open_channel: "Offener Kanal", upgrade_unlock: "🔒 Upgraden zum Freischalten", available: "Verfügbar",
        room_label: "Raum", back_to_lobby: "← Zurück zur Lobby",
        channel_empty: "Hier sind noch keine Mitglieder — sei der Erste, der Hallo sagt, wenn dieser Kanal aktiv wird.",
        room_joined: "Du bist {room} beigetreten. Dieser Raum ist gerade still — lade jemanden ein oder schau später vorbei.",
        plan_line: "{tier}-Plan", member_suffix: "MITGLIED",
        plans_title: "Wähle deinen Plan", plans_subtitle: "Jederzeit upgraden. Keine versteckten Kosten, jederzeit kündbar.",
        back_to_lobby_btn: "Zurück zur Lobby", current_plan_btn: "Aktueller Plan", choose_prefix: "Wählen", per_month: "/ Monat",
        account_title: "Alles bereit 🎉", plan_label: "Plan:", membership_id_label: "Mitglieds-ID:",
        account_subtitle: "Deine Mitglieds-ID kennzeichnet deinen Plan in der gesamten App. Du kannst deinen Plan jederzeit in den Kontoeinstellungen einsehen oder ändern.",
        continue_lobby_btn: "Weiter zur Lobby",
        reg_missing_fields: "Bitte gib Name, E-Mail und Geschlecht an, um fortzufahren.",
        channels: ["Asien", "Europa", "Nordamerika", "Südamerika", "Afrika", "Australien / Ozeanien", "Antarktis"],
        tiers: {
            free: { label: "Kostenlos", calls: "Keine", features: ["Zugang zu 2 regionalen Kanälen", "Nur Textnachrichten", "Standard-Profilsichtbarkeit"] },
            silver: { label: "Silber", calls: "Keine", features: ["Zugang zu 5 regionalen Kanälen", "3 private Räume freigeschaltet", "Unbegrenzte Textnachrichten", "Silber-Mitgliedsabzeichen"] },
            gold: { label: "Gold", calls: "Sprachanrufe", features: ["Zugang zu allen 7 regionalen Kanälen", "7 private Räume freigeschaltet", "Sprachanrufe aktiviert", "Bevorzugte Profilsichtbarkeit"] },
            platinum: { label: "Platin", calls: "Sprach- & Videoanrufe", features: ["Zugang zu allen 7 regionalen Kanälen", "Alle 10 privaten Räume freigeschaltet", "Sprach- & Videoanrufe aktiviert", "Höchste Profilsichtbarkeit"] },
        },
    },
    ja: {
        auth_title: "おかえりなさい", auth_subtitle: "サインインしてアカウントを続ける",
        login_email_ph: "メールアドレス", login_pass_ph: "パスワード", signin_btn: "サインイン",
        no_account: "アカウントをお持ちでないですか？", create_one: "作成する",
        register_title: "プロフィールを作成", register_subtitle: "はじめるために少し自己紹介をしてください。",
        reg_name_ph: "氏名", reg_email_ph: "メールアドレス", reg_phone_ph: "電話番号",
        reg_gender_default: "性別を選択", reg_gender_male: "男性", reg_gender_female: "女性",
        reg_gender_nonbinary: "ノンバイナリー", reg_gender_prefer: "回答しない", continue_btn: "続ける",
        verify_title: "メールを確認",
        verify_subtitle: "メールに4桁のコードを送信しました。このデモでは下に表示されています — 入力して続けてください。",
        otp_ph: "4桁のコードを入力", verify_btn: "確認",
        verify_mismatch: "コードが一致しません。確認してもう一度お試しください。",
        photo_title: "プロフィール写真を追加", photo_subtitle: "任意です — 設定からいつでも追加・変更できます。",
        save_continue_btn: "保存して続ける", skip_for_now: "今はスキップ",
        welcome_label: "ようこそ、", friend_fallback: "あなた", manage_plan_btn: "プランを管理",
        regional_channels_title: "地域チャンネル", regional_channels_hint: "チャンネルに参加して、その地域の人と出会いましょう。",
        private_rooms_title: "プライベートルーム", private_rooms_hint: "より親密な会話のための小さな空間です。利用可否はプランによります。",
        open_channel: "オープン中", upgrade_unlock: "🔒 アップグレードで解除", available: "利用可能",
        room_label: "ルーム", back_to_lobby: "← ロビーに戻る",
        channel_empty: "まだメンバーがいません — このチャンネルが開いたら最初に挨拶しましょう。",
        room_joined: "{room}に参加しました。今は静かです — 誰かを招待するか、後でまた確認してください。",
        plan_line: "{tier}プラン", member_suffix: "会員",
        plans_title: "プランを選択", plans_subtitle: "いつでもアップグレード可能。隠れた料金はなく、いつでも解約できます。",
        back_to_lobby_btn: "ロビーに戻る", current_plan_btn: "現在のプラン", choose_prefix: "選択", per_month: "/ 月",
        account_title: "準備完了です 🎉", plan_label: "プラン：", membership_id_label: "会員ID：",
        account_subtitle: "会員IDはアプリ全体でお客様のプランを識別します。アカウント設定からいつでもプランを確認・変更できます。",
        continue_lobby_btn: "ロビーへ進む",
        reg_missing_fields: "続けるには氏名、メール、性別を入力してください。",
        channels: ["アジア", "ヨーロッパ", "北アメリカ", "南アメリカ", "アフリカ", "オーストラリア / オセアニア", "南極"],
        tiers: {
            free: { label: "無料", calls: "なし", features: ["地域チャンネル2つにアクセス", "テキストメッセージのみ", "標準のプロフィール公開範囲"] },
            silver: { label: "シルバー", calls: "なし", features: ["地域チャンネル5つにアクセス", "プライベートルーム3室が解除", "無制限のテキストメッセージ", "シルバー会員バッジ"] },
            gold: { label: "ゴールド", calls: "音声通話", features: ["地域チャンネル全7つにアクセス", "プライベートルーム7室が解除", "音声通話が利用可能", "優先的なプロフィール表示"] },
            platinum: { label: "プラチナ", calls: "音声・ビデオ通話", features: ["地域チャンネル全7つにアクセス", "プライベートルーム全10室が解除", "音声・ビデオ通話が利用可能", "最大限のプロフィール表示"] },
        },
    },
    ko: {
        auth_title: "다시 오신 것을 환영합니다", auth_subtitle: "계정을 계속 사용하려면 로그인하세요.",
        login_email_ph: "이메일 주소", login_pass_ph: "비밀번호", signin_btn: "로그인",
        no_account: "계정이 없으신가요?", create_one: "계정 만들기",
        register_title: "프로필 만들기", register_subtitle: "시작하려면 자신에 대해 조금 알려주세요.",
        reg_name_ph: "이름", reg_email_ph: "이메일 주소", reg_phone_ph: "전화번호",
        reg_gender_default: "성별 선택", reg_gender_male: "남성", reg_gender_female: "여성",
        reg_gender_nonbinary: "논바이너리", reg_gender_prefer: "밝히지 않음", continue_btn: "계속",
        verify_title: "이메일 인증",
        verify_subtitle: "이메일로 4자리 코드를 보냈습니다. 이 데모에서는 아래에 표시됩니다 — 입력하여 계속하세요.",
        otp_ph: "4자리 코드 입력", verify_btn: "인증",
        verify_mismatch: "코드가 일치하지 않습니다. 확인 후 다시 시도해주세요.",
        photo_title: "프로필 사진 추가", photo_subtitle: "선택 사항입니다 — 설정에서 언제든지 추가하거나 변경할 수 있습니다.",
        save_continue_btn: "저장하고 계속", skip_for_now: "지금은 건너뛰기",
        welcome_label: "환영합니다,", friend_fallback: "회원님", manage_plan_btn: "플랜 관리",
        regional_channels_title: "지역 채널", regional_channels_hint: "채널에 참여해 해당 지역 사람들을 만나보세요.",
        private_rooms_title: "프라이빗 룸", private_rooms_hint: "더 친밀한 대화를 위한 작은 공간입니다. 이용 가능 여부는 플랜에 따라 다릅니다.",
        open_channel: "열린 채널", upgrade_unlock: "🔒 업그레이드하여 잠금 해제", available: "이용 가능",
        room_label: "룸", back_to_lobby: "← 로비로 돌아가기",
        channel_empty: "아직 멤버가 없습니다 — 채널이 활성화되면 첫 인사를 건네보세요.",
        room_joined: "{room}에 참여했습니다. 현재 조용한 공간입니다 — 누군가를 초대하거나 나중에 다시 확인해보세요.",
        plan_line: "{tier} 플랜", member_suffix: "멤버",
        plans_title: "플랜 선택", plans_subtitle: "언제든지 업그레이드하세요. 숨겨진 수수료 없이 언제든 취소할 수 있습니다.",
        back_to_lobby_btn: "로비로 돌아가기", current_plan_btn: "현재 플랜", choose_prefix: "선택", per_month: "/ 월",
        account_title: "모든 준비가 끝났습니다 🎉", plan_label: "플랜:", membership_id_label: "멤버십 ID:",
        account_subtitle: "멤버십 ID는 앱 전체에서 회원님의 플랜을 식별합니다. 계정 설정에서 언제든지 플랜을 확인하거나 변경할 수 있습니다.",
        continue_lobby_btn: "로비로 계속",
        reg_missing_fields: "계속하려면 이름, 이메일, 성별을 입력해주세요.",
        channels: ["아시아", "유럽", "북아메리카", "남아메리카", "아프리카", "오스트레일리아 / 오세아니아", "남극"],
        tiers: {
            free: { label: "무료", calls: "없음", features: ["지역 채널 2개 이용 가능", "텍스트 메시지만 가능", "표준 프로필 노출"] },
            silver: { label: "실버", calls: "없음", features: ["지역 채널 5개 이용 가능", "프라이빗 룸 3개 잠금 해제", "무제한 텍스트 메시지", "실버 멤버십 배지"] },
            gold: { label: "골드", calls: "음성 통화", features: ["7개 지역 채널 모두 이용 가능", "프라이빗 룸 7개 잠금 해제", "음성 통화 이용 가능", "우선 프로필 노출"] },
            platinum: { label: "플래티넘", calls: "음성 및 영상 통화", features: ["7개 지역 채널 모두 이용 가능", "프라이빗 룸 10개 모두 잠금 해제", "음성 및 영상 통화 이용 가능", "최상위 프로필 노출"] },
        },
    },
    pt: {
        auth_title: "Bem-vindo de volta", auth_subtitle: "Entre para continuar na sua conta.",
        login_email_ph: "Endereço de e-mail", login_pass_ph: "Senha", signin_btn: "Entrar",
        no_account: "Não tem conta?", create_one: "Criar uma",
        register_title: "Crie seu perfil", register_subtitle: "Conte um pouco sobre você para começar.",
        reg_name_ph: "Nome completo", reg_email_ph: "Endereço de e-mail", reg_phone_ph: "Número de telefone",
        reg_gender_default: "Selecione o gênero", reg_gender_male: "Masculino", reg_gender_female: "Feminino",
        reg_gender_nonbinary: "Não binário", reg_gender_prefer: "Prefiro não dizer", continue_btn: "Continuar",
        verify_title: "Verifique seu e-mail",
        verify_subtitle: "Enviamos um código de 4 dígitos para o seu e-mail. Nesta demonstração, ele aparece abaixo — digite-o para continuar.",
        otp_ph: "Digite o código de 4 dígitos", verify_btn: "Verificar",
        verify_mismatch: "Esse código não corresponde. Verifique e tente novamente.",
        photo_title: "Adicione uma foto de perfil",
        photo_subtitle: "Opcional — você pode adicionar ou alterar depois nas configurações.",
        save_continue_btn: "Salvar e continuar", skip_for_now: "Pular por agora",
        welcome_label: "Bem-vindo,", friend_fallback: "amigo(a)", manage_plan_btn: "Gerenciar plano",
        regional_channels_title: "Canais regionais", regional_channels_hint: "Entre em um canal para conhecer pessoas dessa região.",
        private_rooms_title: "Salas privadas",
        private_rooms_hint: "Espaços menores e mais focados para conversas mais próximas. A disponibilidade depende do seu plano.",
        open_channel: "Canal aberto", upgrade_unlock: "🔒 Faça upgrade para desbloquear", available: "Disponível",
        room_label: "Sala", back_to_lobby: "← Voltar ao lobby",
        channel_empty: "Ainda não há membros aqui — seja o primeiro a dizer olá quando este canal abrir.",
        room_joined: "Você entrou em {room}. Este espaço está tranquilo por enquanto — convide alguém ou volte mais tarde.",
        plan_line: "Plano {tier}", member_suffix: "MEMBRO",
        plans_title: "Escolha seu plano", plans_subtitle: "Faça upgrade quando quiser. Sem taxas ocultas, cancele quando quiser.",
        back_to_lobby_btn: "Voltar ao lobby", current_plan_btn: "Plano atual", choose_prefix: "Escolher", per_month: "/ mês",
        account_title: "Tudo pronto 🎉", plan_label: "Plano:", membership_id_label: "ID de associado:",
        account_subtitle: "Seu ID de associado identifica seu plano em todo o aplicativo. Você pode ver ou alterar seu plano quando quiser nas configurações da conta.",
        continue_lobby_btn: "Continuar para o lobby",
        reg_missing_fields: "Preencha nome, e-mail e gênero para continuar.",
        channels: ["Ásia", "Europa", "América do Norte", "América do Sul", "África", "Austrália / Oceania", "Antártida"],
        tiers: {
            free: { label: "Grátis", calls: "Nenhuma", features: ["Acesso a 2 canais regionais", "Somente mensagens de texto", "Visibilidade de perfil padrão"] },
            silver: { label: "Prata", calls: "Nenhuma", features: ["Acesso a 5 canais regionais", "3 salas privadas desbloqueadas", "Mensagens de texto ilimitadas", "Selo de membro Prata"] },
            gold: { label: "Ouro", calls: "Chamadas de voz", features: ["Acesso a todos os 7 canais regionais", "7 salas privadas desbloqueadas", "Chamadas de voz habilitadas", "Visibilidade de perfil prioritária"] },
            platinum: { label: "Platina", calls: "Chamadas de voz e vídeo", features: ["Acesso a todos os 7 canais regionais", "Todas as 10 salas privadas desbloqueadas", "Chamadas de voz e vídeo habilitadas", "Máxima visibilidade de perfil"] },
        },
    },
    ar: {
        auth_title: "مرحبًا بعودتك", auth_subtitle: "سجّل الدخول لمتابعة استخدام حسابك.",
        login_email_ph: "البريد الإلكتروني", login_pass_ph: "كلمة المرور", signin_btn: "تسجيل الدخول",
        no_account: "ليس لديك حساب؟", create_one: "أنشئ واحدًا",
        register_title: "أنشئ ملفك الشخصي", register_subtitle: "أخبرنا قليلاً عن نفسك للبدء.",
        reg_name_ph: "الاسم الكامل", reg_email_ph: "البريد الإلكتروني", reg_phone_ph: "رقم الهاتف",
        reg_gender_default: "اختر الجنس", reg_gender_male: "ذكر", reg_gender_female: "أنثى",
        reg_gender_nonbinary: "غير ثنائي", reg_gender_prefer: "أفضل عدم القول", continue_btn: "متابعة",
        verify_title: "تحقق من بريدك الإلكتروني",
        verify_subtitle: "أرسلنا رمزًا من 4 أرقام إلى بريدك الإلكتروني. في هذا العرض التوضيحي، يظهر أدناه — أدخله للمتابعة.",
        otp_ph: "أدخل الرمز المكوّن من 4 أرقام", verify_btn: "تحقق",
        verify_mismatch: "هذا الرمز غير مطابق. يرجى التحقق والمحاولة مرة أخرى.",
        photo_title: "أضف صورة للملف الشخصي",
        photo_subtitle: "اختياري — يمكنك دائمًا إضافتها أو تغييرها لاحقًا من الإعدادات.",
        save_continue_btn: "حفظ ومتابعة", skip_for_now: "تخطَّ الآن",
        welcome_label: "مرحبًا،", friend_fallback: "صديقي", manage_plan_btn: "إدارة الخطة",
        regional_channels_title: "القنوات الإقليمية", regional_channels_hint: "انضم إلى قناة للتعرف على أشخاص من تلك المنطقة.",
        private_rooms_title: "الغرف الخاصة",
        private_rooms_hint: "مساحات أصغر وأكثر تركيزًا لمحادثات أقرب. يعتمد التوفر على خطتك.",
        open_channel: "قناة مفتوحة", upgrade_unlock: "🔒 قم بالترقية للفتح", available: "متاح",
        room_label: "غرفة", back_to_lobby: "← العودة إلى الردهة",
        channel_empty: "لا يوجد أعضاء هنا بعد — كن أول من يرحّب عندما تفتح هذه القناة.",
        room_joined: "لقد انضممت إلى {room}. هذه المساحة هادئة حاليًا — ادعُ أحدًا أو عد لاحقًا.",
        plan_line: "خطة {tier}", member_suffix: "عضو",
        plans_title: "اختر خطتك", plans_subtitle: "قم بالترقية في أي وقت. بدون رسوم خفية، ويمكنك الإلغاء متى شئت.",
        back_to_lobby_btn: "العودة إلى الردهة", current_plan_btn: "الخطة الحالية", choose_prefix: "اختر", per_month: "/ شهريًا",
        account_title: "كل شيء جاهز 🎉", plan_label: "الخطة:", membership_id_label: "معرّف العضوية:",
        account_subtitle: "يحدد معرّف العضوية خطتك في جميع أنحاء التطبيق. يمكنك عرض خطتك أو تغييرها في أي وقت من إعدادات حسابك.",
        continue_lobby_btn: "المتابعة إلى الردهة",
        reg_missing_fields: "يرجى إدخال الاسم والبريد الإلكتروني والجنس للمتابعة.",
        channels: ["آسيا", "أوروبا", "أمريكا الشمالية", "أمريكا الجنوبية", "أفريقيا", "أستراليا / أوقيانوسيا", "القارة القطبية الجنوبية"],
        tiers: {
            free: { label: "مجاني", calls: "لا يوجد", features: ["الوصول إلى قناتين إقليميتين", "الرسائل النصية فقط", "ظهور عادي للملف الشخصي"] },
            silver: { label: "الفضية", calls: "لا يوجد", features: ["الوصول إلى 5 قنوات إقليمية", "فتح 3 غرف خاصة", "رسائل نصية غير محدودة", "شارة عضوية فضية"] },
            gold: { label: "الذهبية", calls: "مكالمات صوتية", features: ["الوصول إلى جميع القنوات الإقليمية السبع", "فتح 7 غرف خاصة", "تفعيل المكالمات الصوتية", "ظهور مميز للملف الشخصي"] },
            platinum: { label: "البلاتينية", calls: "مكالمات صوتية ومرئية", features: ["الوصول إلى جميع القنوات الإقليمية السبع", "فتح جميع الغرف الخاصة العشر", "تفعيل المكالمات الصوتية والمرئية", "أعلى ظهور للملف الشخصي"] },
        },
    },
    ru: {
        auth_title: "С возвращением", auth_subtitle: "Войдите, чтобы продолжить работу с аккаунтом.",
        login_email_ph: "Электронная почта", login_pass_ph: "Пароль", signin_btn: "Войти",
        no_account: "Нет аккаунта?", create_one: "Создать",
        register_title: "Создайте профиль", register_subtitle: "Расскажите немного о себе, чтобы начать.",
        reg_name_ph: "Полное имя", reg_email_ph: "Электронная почта", reg_phone_ph: "Номер телефона",
        reg_gender_default: "Выберите пол", reg_gender_male: "Мужской", reg_gender_female: "Женский",
        reg_gender_nonbinary: "Небинарный", reg_gender_prefer: "Предпочитаю не указывать", continue_btn: "Продолжить",
        verify_title: "Подтвердите вашу почту",
        verify_subtitle: "Мы отправили 4-значный код на вашу почту. В этой демо-версии он показан ниже — введите его, чтобы продолжить.",
        otp_ph: "Введите 4-значный код", verify_btn: "Подтвердить",
        verify_mismatch: "Код не совпадает. Проверьте и попробуйте снова.",
        photo_title: "Добавьте фото профиля",
        photo_subtitle: "Необязательно — вы всегда можете добавить или изменить его позже в настройках.",
        save_continue_btn: "Сохранить и продолжить", skip_for_now: "Пропустить пока",
        welcome_label: "Добро пожаловать,", friend_fallback: "друг", manage_plan_btn: "Управление тарифом",
        regional_channels_title: "Региональные каналы", regional_channels_hint: "Присоединяйтесь к каналу, чтобы познакомиться с людьми из этого региона.",
        private_rooms_title: "Приватные комнаты",
        private_rooms_hint: "Более камерные пространства для близкого общения. Доступность зависит от вашего тарифа.",
        open_channel: "Открытый канал", upgrade_unlock: "🔒 Улучшите тариф, чтобы открыть", available: "Доступно",
        room_label: "Комната", back_to_lobby: "← Назад в лобби",
        channel_empty: "Здесь пока нет участников — станьте первым, кто поздоровается, когда канал оживёт.",
        room_joined: "Вы присоединились к {room}. Здесь пока тихо — пригласите кого-нибудь или загляните позже.",
        plan_line: "Тариф «{tier}»", member_suffix: "УЧАСТНИК",
        plans_title: "Выберите тариф", plans_subtitle: "Меняйте тариф в любое время. Без скрытых платежей, отменить можно когда угодно.",
        back_to_lobby_btn: "Назад в лобби", current_plan_btn: "Текущий тариф", choose_prefix: "Выбрать", per_month: "/ месяц",
        account_title: "Всё готово 🎉", plan_label: "Тариф:", membership_id_label: "ID участника:",
        account_subtitle: "Ваш ID участника определяет ваш тариф во всём приложении. Вы можете посмотреть или изменить тариф в любое время в настройках аккаунта.",
        continue_lobby_btn: "Перейти в лобби",
        reg_missing_fields: "Пожалуйста, укажите имя, почту и пол, чтобы продолжить.",
        channels: ["Азия", "Европа", "Северная Америка", "Южная Америка", "Африка", "Австралия / Океания", "Антарктида"],
        tiers: {
            free: { label: "Бесплатный", calls: "Нет", features: ["Доступ к 2 региональным каналам", "Только текстовые сообщения", "Стандартная видимость профиля"] },
            silver: { label: "Серебряный", calls: "Нет", features: ["Доступ к 5 региональным каналам", "3 приватные комнаты открыты", "Неограниченные текстовые сообщения", "Значок серебряного участника"] },
            gold: { label: "Золотой", calls: "Голосовые звонки", features: ["Доступ ко всем 7 региональным каналам", "7 приватных комнат открыты", "Голосовые звонки доступны", "Приоритетная видимость профиля"] },
            platinum: { label: "Платиновый", calls: "Голосовые и видеозвонки", features: ["Доступ ко всем 7 региональным каналам", "Все 10 приватных комнат открыты", "Голосовые и видеозвонки доступны", "Максимальная видимость профиля"] },
        },
    },
    hi: {
        auth_title: "वापसी पर स्वागत है", auth_subtitle: "अपने खाते तक जारी रखने के लिए साइन इन करें।",
        login_email_ph: "ईमेल पता", login_pass_ph: "पासवर्ड", signin_btn: "साइन इन करें",
        no_account: "खाता नहीं है?", create_one: "एक बनाएं",
        register_title: "अपनी प्रोफ़ाइल बनाएं", register_subtitle: "शुरू करने के लिए अपने बारे में थोड़ा बताएं।",
        reg_name_ph: "पूरा नाम", reg_email_ph: "ईमेल पता", reg_phone_ph: "फ़ोन नंबर",
        reg_gender_default: "लिंग चुनें", reg_gender_male: "पुरुष", reg_gender_female: "महिला",
        reg_gender_nonbinary: "नॉन-बाइनरी", reg_gender_prefer: "बताना नहीं चाहते", continue_btn: "जारी रखें",
        verify_title: "अपना ईमेल सत्यापित करें",
        verify_subtitle: "हमने आपके ईमेल पर 4 अंकों का कोड भेजा है। इस डेमो में यह नीचे दिखाया गया है — जारी रखने के लिए इसे दर्ज करें।",
        otp_ph: "4 अंकों का कोड दर्ज करें", verify_btn: "सत्यापित करें",
        verify_mismatch: "यह कोड मेल नहीं खाता। कृपया जांचें और फिर से प्रयास करें।",
        photo_title: "प्रोफ़ाइल फ़ोटो जोड़ें",
        photo_subtitle: "वैकल्पिक — आप इसे बाद में अपनी सेटिंग्स में कभी भी जोड़ या बदल सकते हैं।",
        save_continue_btn: "सहेजें और जारी रखें", skip_for_now: "अभी के लिए छोड़ें",
        welcome_label: "स्वागत है,", friend_fallback: "मित्र", manage_plan_btn: "प्लान प्रबंधित करें",
        regional_channels_title: "क्षेत्रीय चैनल", regional_channels_hint: "उस क्षेत्र के लोगों से मिलने के लिए किसी चैनल से जुड़ें।",
        private_rooms_title: "निजी कमरे",
        private_rooms_hint: "अधिक करीबी बातचीत के लिए छोटे, केंद्रित स्थान। उपलब्धता आपके प्लान पर निर्भर करती है।",
        open_channel: "खुला चैनल", upgrade_unlock: "🔒 अनलॉक करने के लिए अपग्रेड करें", available: "उपलब्ध",
        room_label: "कमरा", back_to_lobby: "← लॉबी पर वापस जाएं",
        channel_empty: "यहां अभी तक कोई सदस्य नहीं है — जब यह चैनल खुले तो सबसे पहले नमस्ते कहें।",
        room_joined: "आप {room} में शामिल हो गए हैं। यह जगह अभी शांत है — किसी को आमंत्रित करें या बाद में देखें।",
        plan_line: "{tier} प्लान", member_suffix: "सदस्य",
        plans_title: "अपना प्लान चुनें", plans_subtitle: "कभी भी अपग्रेड करें। कोई छिपी हुई फीस नहीं, जब चाहें रद्द करें।",
        back_to_lobby_btn: "लॉबी पर वापस जाएं", current_plan_btn: "मौजूदा प्लान", choose_prefix: "चुनें", per_month: "/ महीना",
        account_title: "सब तैयार है 🎉", plan_label: "प्लान:", membership_id_label: "सदस्यता आईडी:",
        account_subtitle: "आपकी सदस्यता आईडी पूरे ऐप में आपके प्लान की पहचान करती है। आप कभी भी अपनी खाता सेटिंग्स से अपना प्लान देख या बदल सकते हैं।",
        continue_lobby_btn: "लॉबी पर जारी रखें",
        reg_missing_fields: "जारी रखने के लिए कृपया अपना नाम, ईमेल और लिंग भरें।",
        channels: ["एशिया", "यूरोप", "उत्तरी अमेरिका", "दक्षिण अमेरिका", "अफ़्रीका", "ऑस्ट्रेलिया / ओशिनिया", "अंटार्कटिका"],
        tiers: {
            free: { label: "मुफ़्त", calls: "कोई नहीं", features: ["2 क्षेत्रीय चैनलों तक पहुंच", "केवल टेक्स्ट मैसेजिंग", "मानक प्रोफ़ाइल दृश्यता"] },
            silver: { label: "सिल्वर", calls: "कोई नहीं", features: ["5 क्षेत्रीय चैनलों तक पहुंच", "3 निजी कमरे अनलॉक", "असीमित टेक्स्ट मैसेजिंग", "सिल्वर सदस्यता बैज"] },
            gold: { label: "गोल्ड", calls: "वॉइस कॉल", features: ["सभी 7 क्षेत्रीय चैनलों तक पहुंच", "7 निजी कमरे अनलॉक", "वॉइस कॉल सक्षम", "प्राथमिकता प्रोफ़ाइल दृश्यता"] },
            platinum: { label: "प्लैटिनम", calls: "वॉइस और वीडियो कॉल", features: ["सभी 7 क्षेत्रीय चैनलों तक पहुंच", "सभी 10 निजी कमरे अनलॉक", "वॉइस और वीडियो कॉल सक्षम", "सर्वोच्च प्रोफ़ाइल दृश्यता"] },
        },
    },
};

function dict() {
    return I18N[currentLang] || I18N.en;
}

function t(key) {
    const d = dict();
    return d[key] !== undefined ? d[key] : I18N.en[key];
}

/** Language switching **/
function applyLanguage(lang) {
    if (!I18N[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('amara_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    const switcher = document.getElementById('lang-switcher');
    if (switcher) switcher.value = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    renderLobby();
    renderPlans();
}

/** Screen routing **/
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

function handleLogin() {
    showScreen('screen-register');
}

/** Step 1: registration **/
function processRegistrationData() {
    state.gender = document.getElementById('reg-sex').value;
    state.name = document.getElementById('reg-name').value.trim();
    state.email = document.getElementById('reg-email').value.trim();

    if (!state.gender || !state.name || !state.email) {
        alert(t('reg_missing_fields'));
        return;
    }

    state.targetOTP = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('generated-otp-display').innerText = state.targetOTP;
    showScreen('screen-verify');
}

/** Step 2: verification **/
function verifyOTPCode() {
    const userIn = document.getElementById('user-otp-input').value;
    if (userIn === state.targetOTP) {
        showScreen('screen-photo');
    } else {
        alert(t('verify_mismatch'));
    }
}

/** Step 3: optional profile photo, then into the app on the Free plan **/
function finishProfileSetup() {
    state.tier = "free";
    renderLobby();
    showScreen('screen-lobby');
}

/** Lobby rendering **/
function renderLobby() {
    const d = dict();
    const tierMeta = TIER_META[state.tier];
    const tierText = d.tiers[state.tier];

    document.getElementById('lobby-username').innerText = state.name || t('friend_fallback');
    document.getElementById('lobby-tier-line').innerText = t('plan_line').replace('{tier}', tierText.label);

    const badge = document.getElementById('tier-badge');
    if (state.tier === "free") {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'block';
        badge.innerText = `${tierText.label.toUpperCase()} ${t('member_suffix')}`;
    }

    const channelsGrid = document.getElementById('channels-grid');
    channelsGrid.innerHTML = "";
    for (let i = 0; i < CHANNEL_COUNT; i++) {
        const unlocked = i < tierMeta.channelAccess;
        const card = document.createElement('div');
        card.className = `channel-card ${unlocked ? '' : 'locked'}`;
        card.innerHTML = `<h3>${d.channels[i]}</h3><p>${unlocked ? t('open_channel') : t('upgrade_unlock')}</p>`;
        card.onclick = () => unlocked ? enterChannel(i) : showScreen('screen-plans');
        channelsGrid.appendChild(card);
    }

    const roomsGrid = document.getElementById('rooms-grid');
    roomsGrid.innerHTML = "";
    for (let i = 1; i <= ROOM_COUNT; i++) {
        const unlocked = i <= tierMeta.roomAccess;
        const card = document.createElement('div');
        card.className = `channel-card room-card ${unlocked ? '' : 'locked'}`;
        card.innerHTML = `<h3>${t('room_label')} ${i}</h3><p>${unlocked ? t('available') : t('upgrade_unlock')}</p>`;
        card.onclick = () => unlocked ? enterRoom(i) : showScreen('screen-plans');
        roomsGrid.appendChild(card);
    }
}

function enterChannel(index) {
    document.getElementById('current-channel-title').innerText = dict().channels[index];
    showScreen('screen-channel-view');
}

function enterRoom(roomNumber) {
    const roomName = `${t('room_label')} ${roomNumber}`;
    document.getElementById('current-room-title').innerText = roomName;
    document.getElementById('room-content').innerHTML = `<p>${t('room_joined').replace('{room}', roomName)}</p>`;
    showScreen('screen-room-view');
}

/** Plans rendering **/
function renderPlans() {
    const d = dict();
    const grid = document.getElementById('plans-grid');
    grid.innerHTML = "";
    TIER_ORDER.forEach(key => {
        const meta = TIER_META[key];
        const text = d.tiers[key];
        const priceLine = key === 'free' ? meta.priceValue : `${meta.priceValue} ${t('per_month')}`;
        const card = document.createElement('div');
        card.className = `plan-card ${key}`;
        card.innerHTML = `
            <div>
                <h3>${text.label}</h3>
                <div class="price">${priceLine}</div>
                <ul class="features-list">
                    ${text.features.map(f => `<li>• ${f}</li>`).join("")}
                </ul>
            </div>
            <button onclick="choosePlan('${key}')">${state.tier === key ? t('current_plan_btn') : t('choose_prefix') + ' ' + text.label}</button>
        `;
        grid.appendChild(card);
    });
}

function generateMembershipId(prefix) {
    return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function choosePlan(tierKey) {
    state.tier = tierKey;
    const meta = TIER_META[tierKey];
    const text = dict().tiers[tierKey];
    state.membershipId = generateMembershipId(meta.prefix);

    const priceLine = tierKey === 'free' ? meta.priceValue : `${meta.priceValue} ${t('per_month')}`;
    document.getElementById('selected-plan-notice').innerText = `${text.label} — ${priceLine}`;
    document.getElementById('membership-id-display').innerText = state.membershipId;

    renderLobby();
    showScreen('screen-account');
}

document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLang));
