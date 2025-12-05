import fs from "node:fs";
import fetch from "node-fetch";
import "dotenv/config"; // Load .env automatically

// 2️⃣ Add your real cookies here (copy from network tab → request headers)
const COOKIE_HEADER = `X-HS-IAuth=${process.env.X_HS_IAUTH}; X-HS-IAuth-UserID=${process.env.X_HS_IAUTH_USERID}`;

// Bulk Get and save in JSON file
// Edit file path and prefixes array for customisation
(async function () {
  // 1️⃣ Put all prefix keys from your sheet here:
  const prefixes = [
    // Login Page
    "bff__IdPreviousLoginSubTitle_HotstarMobileExcludedContent",
    "bff__IdPreviousLoginSubTitle_HotstarMobileExcludedContentAdsFree",

    // AddOnCardWidget
    "bff__addon_cancel_cancel_primary_cta",
    "bff__addon_widget_dialog_item_text_1",
    "bff__addon_widget_dialog_item_text_2",
    "bff__addon_widget_dialog_item_text_3",
    "bff__addon_widget_dialog_subtitle",
    "bff__addon_widget_dialog_subtitle_3_months",
    "bff__addon_widget_dialog_title",
    "bff__addon_widget_footer_subtitle",
    "bff__addon_widget_selector_subtitle",
    "bff__addon_widget_selector_title",
    "bff__addon_widget_selector_title_3_months",

    // Paywall USPs
    "bff__plan_card_widget_usp_ads_ads_enabled",
    "bff__plan_card_widget_usp_ads_ads_free",
    "bff__plan_card_widget_usp_audio_dolby_atmos",
    "bff__plan_card_widget_usp_audio_standard_stereo",
    "bff__plan_card_widget_usp_content_all_content",
    "bff__plan_card_widget_usp_content_no_hollywood_elite_sports",
    "bff__plan_card_widget_usp_devices_one_device",
    "bff__plan_card_widget_usp_devices_two_devices",
    "bff__plan_card_widget_usp_devices_four_devices",
    "bff__plan_card_widget_usp_platform_all_platforms",
    "bff__plan_card_widget_usp_platform_mobile_platform",
    "bff__plan_card_widget_usp_resolution_fhd_resolution",
    "bff__plan_card_widget_usp_resolution_hd_resolution",
    "bff__plan_card_widget_usp_resolution_uhd_resolution",

    "bff__plan_card_widget_usp_ads_ads_enabled_android",
    "bff__plan_card_widget_usp_ads_ads_enabled_ios",
    "bff__plan_card_widget_usp_ads_ads_enabled_mweb",

    "bff__plan_card_widget_usp_ads_ads_free_android",
    "bff__plan_card_widget_usp_ads_ads_free_ios",
    "bff__plan_card_widget_usp_ads_ads_free_mweb",

    "bff__plan_card_widget_usp_devices_two_devices_android",
    "bff__plan_card_widget_usp_devices_two_devices_ios",
    "bff__plan_card_widget_usp_devices_two_devices_mweb",

    "bff__plan_card_widget_usp_devices_four_devices_android",
    "bff__plan_card_widget_usp_devices_four_devices_ios",
    "bff__plan_card_widget_usp_devices_four_devices_mweb",

    "bff__plan_card_widget_usp_platform_mobile_platform_android",
    "bff__plan_card_widget_usp_platform_mobile_platform_ios",
    "bff__plan_card_widget_usp_platform_mobile_platform_mweb",

    "bff__plan_card_widget_usp_resolution_fhd_resolution_android",
    "bff__plan_card_widget_usp_resolution_fhd_resolution_ios",
    "bff__plan_card_widget_usp_resolution_fhd_resolution_mweb",

    "bff__plan_card_widget_usp_resolution_hd_resolution_android",
    "bff__plan_card_widget_usp_resolution_hd_resolution_ios",
    "bff__plan_card_widget_usp_resolution_hd_resolution_mweb",

    "bff__plan_card_widget_usp_resolution_uhd_resolution_android",
    "bff__plan_card_widget_usp_resolution_uhd_resolution_ios",
    "bff__plan_card_widget_usp_resolution_uhd_resolution_mweb",

    // AddOnCardDialog
    "bff__addon_widget_dialog_cta_text_2",
    "bff__addon_widget_dialog_subtitle",
    "bff__addon_widget_dialog_item_text_1",
    "bff__addon_widget_dialog_item_text_2",
    "bff__addon_widget_dialog_title",
    "bff__addon_widget_footer_subtitle",
    "bff__addon_widget_selector_subtitle",
    "bff__addon_widget_selector_title_1_years",
    "bff__addon_widget_selector_title_3_months",

    // MemberActionsWidget
    "bff__subspaywall_v2_callout_label_addon",
    "bff__subspaywall_v2_upgrade_balance_label_addon",
    "bff__subsPaywall_v2_upgrade_final_price_label",
    "bff__subspaywall_v2_upgrade_mrp_label_addon",
    "bff__addon_widget_cancel_cta",
    "bff__addon_cancel_info_title",
    "bff__addon_cancel_info_list_1",
    "bff__addon_cancel_info_list_2",
    "bff__addon_cancel_info_list_3",
    "bff__addon_cancel_info_primary_cta",
    "bff__addon_cancel_info_secondary_cta",
    "bff__addon_cancel_confirm_title",
    "bff__addon_cancel_confirm_description",
    "bff__addon_cancel_cancel_primary_cta",
    "bff__addon_cancel_success_message",
    "bff__subsCancelFlow_CancellationConfirmationMessage",

    // Payments USPs
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_1_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_2_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_3_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_4_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_5_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_6_webos",

    // SUPER Plan - Samsung
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_1_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_2_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_3_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_4_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_5_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperSmp_6_tizentv",

    // Super Ads free - LG
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_1_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_2_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_3_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_4_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_5_webos",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_6_webos",

    // Super Ads free - Samsung
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_1_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_2_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_3_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_4_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_5_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_6_tizentv",

    // Premium - LG
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_1_webos",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_2_webos",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_3_webos",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_4_webos",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_5_webos",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_6_webos",

    // Premium - Samsung
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_1_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_2_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_3_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_4_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_5_tizentv",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_6_tizentv",

    // PaymentSummary widget ATV
    "bff__payment_summary_usp_devices",
    "bff__payment_summary_usp_platform_all_platforms",
    "bff__payment_summary_usp_ads_ads_free",
    "bff__curr_plan_widget_usp_content_all_content",
    "bff__payment_summary_usp_resolution_uhd_resolution",
    "bff__payment_summary_usp_audio_dolby_atmos",
  ];

  async function fetchString(prefix) {
    const url = `https://origin-string-store.preprod.hotstar-labs.com/v3/admin/string?platform=bff&prefix=${prefix}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "*/*",
          "accept-language": "eng",
          "cache-control": "no-cache",
          dnt: "1",
          origin: "https://origin-string-store-ui.preprod.hotstar-labs.com",
          referer: "https://origin-string-store-ui.preprod.hotstar-labs.com/",
          "sec-ch-ua": `"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"`,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": `"macOS"`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
          Cookie: COOKIE_HEADER,
        },
      });

      const json = await res.json();
      return json?.data?.eng?.[prefix] ?? "";
    } catch (err) {
      console.error("Error: ", prefix, err);
      return "";
    }
  }

  // 3️⃣ Fetch all values
  console.log("Fetching values, please wait...");

  const results = {};

  for (const prefix of prefixes) {
    results[prefix] = await fetchString(prefix);
  }

  // Write to AddOnKeys.json
  const outputPath = "./script.json";
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf8");
  console.log(`Written to ${outputPath}`);
  // 4️⃣ Print final JSON
  console.log("FINAL OUTPUT:\n", JSON.stringify(results, null, 2));
})();
