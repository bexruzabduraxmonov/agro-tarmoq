/**
 * Yangi foydalanuvchi ro'yxatdan o'tganda Telegram bot orqali xabarnoma yuboradi.
 * Xavfsizlik: parol hech qachon yuborilmaydi.
 */
export async function sendRegistrationToTelegram({
  name,
  email,
  phone,
  role,
  region,
  method = "Ro'yxatdan o'tish",
}) {
  const botToken =
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
    localStorage.getItem('agro_tg_bot_token') ||
    '';
  const chatId =
    import.meta.env.VITE_TELEGRAM_CHAT_ID ||
    localStorage.getItem('agro_tg_chat_id') ||
    '';

  if (!botToken || !chatId) {
    console.info(
      'Telegram xabarnoma sozlanmagan: VITE_TELEGRAM_BOT_TOKEN va VITE_TELEGRAM_CHAT_ID ni .env.local faylga kiriting.'
    );
    return { ok: false, reason: 'missing_config' };
  }

  const roleLabels = {
    fermer: '🌾 Fermer / Dehqon',
    texnika: '🚜 Texnika egasi / Mexanizator',
    xaridor: '🛒 Xaridor / Savdogar',
    agronom: '🌿 Agronom / Mutaxassis',
  };

  const lines = [
    '🌱 *Agro Tarmoq — Yangi foydalanuvchi!*',
    '',
    `👤 *Ism:* ${escapeMarkdown(name || 'Kiritilmagan')}`,
    `📧 *Email:* ${escapeMarkdown(email || 'Kiritilmagan')}`,
    `📱 *Telefon:* ${escapeMarkdown(phone || 'Kiritilmagan')}`,
    `🏷️ *Rol:* ${escapeMarkdown(roleLabels[role] || role || 'Fermer')}`,
    `📍 *Hudud:* ${escapeMarkdown(region || 'Kiritilmagan')}`,
    `📝 *Usul:* ${escapeMarkdown(method)}`,
    `🕒 *Vaqt:* ${escapeMarkdown(new Date().toLocaleString('uz-UZ'))}`,
  ];

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join('\n'),
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Telegram API xatosi:', errText);
      return { ok: false, reason: 'api_error' };
    }

    return { ok: true };
  } catch (error) {
    console.warn('Telegram xabarnoma yuborishda xatolik:', error);
    return { ok: false, reason: 'network_error' };
  }
}

/**
 * Yangi e'lon (texnika yoki mahsulot) qo'shilganda Telegram bot orqali xabarnoma yuboradi.
 */
export async function sendListingToTelegram({
  type,
  title,
  price,
  region,
  owner,
  phone,
}) {
  const botToken =
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
    localStorage.getItem('agro_tg_bot_token') ||
    '';
  const chatId =
    import.meta.env.VITE_TELEGRAM_CHAT_ID ||
    localStorage.getItem('agro_tg_chat_id') ||
    '';

  if (!botToken || !chatId) {
    return { ok: false, reason: 'missing_config' };
  }

  const lines = [
    type === 'equipment'
      ? '🚜 *Agro Tarmoq — Yangi texnika eʼloni!*'
      : '🌾 *Agro Tarmoq — Yangi mahsulot eʼloni!*',
    '',
    `📌 *Nomi:* ${escapeMarkdown(title || 'Kiritilmagan')}`,
    `💰 *Narxi:* ${escapeMarkdown(price ? `${Number(price).toLocaleString('uz-UZ')} soʻm` : 'Kelishilgan')}`,
    `👤 *Egasi:* ${escapeMarkdown(owner || 'Foydalanuvchi')}`,
    `📱 *Telefon:* ${escapeMarkdown(phone || 'Kiritilmagan')}`,
    `📍 *Hudud:* ${escapeMarkdown(region || 'Kiritilmagan')}`,
    `🕒 *Vaqt:* ${escapeMarkdown(new Date().toLocaleString('uz-UZ'))}`,
  ];

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join('\n'),
          parse_mode: 'Markdown',
        }),
      }
    );
    return { ok: response.ok };
  } catch (error) {
    console.warn('Telegram eʼlon xabarnomasida xatolik:', error);
    return { ok: false, reason: 'network_error' };
  }
}

/**
 * Yangi buyurtma rasmiylashtirilganda Telegram bot orqali xabarnoma yuboradi.
 */
export async function sendOrderToTelegram({
  name,
  phone,
  address,
  comment,
  productName,
  totalInfo,
}) {
  const botToken =
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
    localStorage.getItem('agro_tg_bot_token') ||
    '';
  const chatId =
    import.meta.env.VITE_TELEGRAM_CHAT_ID ||
    localStorage.getItem('agro_tg_chat_id') ||
    '';

  if (!botToken || !chatId) {
    return { ok: false, reason: 'missing_config' };
  }

  const lines = [
    '🛒 *Agro Tarmoq — Yangi buyurtma!*',
    '',
    `📦 *Mahsulot:* ${escapeMarkdown(productName || 'Savatdagi mahsulotlar')}`,
    ...(totalInfo ? [`💰 *Maʼlumot:* ${escapeMarkdown(totalInfo)}`] : []),
    `👤 *Mijoz:* ${escapeMarkdown(name || 'Kiritilmagan')}`,
    `📱 *Telefon:* ${escapeMarkdown(phone || 'Kiritilmagan')}`,
    `📍 *Manzil:* ${escapeMarkdown(address || 'Kiritilmagan')}`,
    ...(comment ? [`💬 *Izoh:* ${escapeMarkdown(comment)}`] : []),
    `🕒 *Vaqt:* ${escapeMarkdown(new Date().toLocaleString('uz-UZ'))}`,
  ];

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join('\n'),
          parse_mode: 'Markdown',
        }),
      }
    );
    return { ok: response.ok };
  } catch (error) {
    console.warn('Telegram buyurtma xabarnomasida xatolik:', error);
    return { ok: false, reason: 'network_error' };
  }
}

function escapeMarkdown(text) {
  return String(text).replace(/([_*`\[])/g, '\\$1');
}
