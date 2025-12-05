String Store Bulk Edit Script
Fetches all bff__ string keys from Hotstar's origin-string-store and saves them to AddOnKeys.json for bulk editing via CURL.

🚀 Quick Start
bash
## 1. Install npm
```
npm install
```

## 2. Edit .env with your auth tokens
 Copy from browser Network tab → origin-string-store requests
```
X_HS_IAUTH=
X_HS_IAUTH_USERID=
```
## 3. Add your bff__ string keys in **prefixes array** in script
```
  const prefixes = [

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

    // PaymentSummary widget ATV
    "bff__payment_summary_usp_devices",
    "bff__payment_summary_usp_platform_all_platforms",
    "bff__payment_summary_usp_ads_ads_free",
    "bff__curr_plan_widget_usp_content_all_content",
    "bff__payment_summary_usp_resolution_uhd_resolution",
    "bff__payment_summary_usp_audio_dolby_atmos",
  ];
```

## 4. Run Script
```
node script.js
```

## 5. Edit script.json with new values

🔄 Bulk Update via CURL
```
curl --location 'https://origin-string-store.preprod.hotstar-labs.com/v3/admin/string/translate?platform=bff' \
--header 'accept: */*' \
--header 'accept-language: eng' \
--header 'cache-control: no-cache' \
--header 'content-type: application/json;charset=UTF-8' \
--header 'dnt: 1' \
--header 'expires: 0' \
--header 'origin: https://origin-string-store-ui.preprod.hotstar-labs.com' \
--header 'priority: u=1, i' \
--header 'referer: https://origin-string-store-ui.preprod.hotstar-labs.com/' \
--header 'sec-ch-ua: "Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'sec-fetch-dest: empty' \
--header 'sec-fetch-mode: cors' \
--header 'sec-fetch-site: same-site' \
--header 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36' \
--header 'Cookie: X-HS-IAuth=; X-HS-IAuth-UserID=' \
--data '{
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_1_webos": "2 devices",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_2_webos": "Mobile, Laptop, TV",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_3_webos": "No Ads (except live)",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_4_webos": "All Content Included",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_5_webos": "4K 2160p + Dolby Vision",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_6_webos": "Dolby Atmos",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_1_tizentv": "2 devices",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_2_tizentv": "Mobile, Laptop, TV",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_3_tizentv": "No Ads (except live)",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_4_tizentv": "All Content Included",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_5_tizentv": "4K 2160p + Dolby Vision",
  "bff__paymentPage_planUSP_bullets_HotstarSuperAdsFreeSmp_6_tizentv": "Dolby Atmos",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_1_tizentv": "4 devices", 
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_1_webos": "4 devices",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_2_tizentv": "Mobile, Laptop, TV", 
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_2_webos": "Mobile, Laptop, TV",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_3_tizentv": "No Ads(except live)", 
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_3_webos": "No Ads(except live)",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_4_tizentv":  "All Content Included", 
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_4_webos": " All Content Included",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_5_tizentv":  "4K 2160p + Dolby Vision", 
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_5_webos": " 4K 2160p + Dolby Vision",
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_6_tizentv":  "Dolby Atmos", 
    "bff__paymentPage_planUSP_bullets_HotstarPremiumSmp_6_webos": "Dolby Atmos"
}
```
Replace Cookie header `Cookie: X-HS-IAuth=; X-HS-IAuth-UserID=` with your .env values.


Replace Cookie header with your .env values or use script-generated headers.

