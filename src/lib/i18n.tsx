"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "hi";

const translations = {
  en: {
    // Header & Meta
    siteName: "PhotoSarkari",
    siteTagline: "Free Indian ID Photo Tool",
    siteSubtag: "Free • Secure • Fast",
    siteDescription: "Resize photos to exact government specifications for Aadhaar, PAN Card, Passport, Voter ID, and exam forms — free, instant, no upload.",

    // Trust bar
    trustFree: "100% Free",
    trustNoUpload: "No Upload to Server",
    trustOffline: "Works Offline",
    trustMadeIn: "Made in India 🇮🇳",

    // Homepage sections
    sectionPhotos: "ID Card & Exam Photos",
    sectionSignatures: "Signature Crops",
    sectionUtilities: "Advanced Utilities",
    sectionGuides: "Photo Size Guides",
    newTool: "New Tool",
    aadhaarMergerTitle: "Aadhaar PDF Merger",
    aadhaarMergerDesc: "Combine Front & Back Aadhaar scans into a single A4 PDF for PAN applications.",
    readGuide: "Read full guide →",

    // How it works
    howItWorks: "How It Works",
    step1: "Select the document type above",
    step2: "Upload or drag your photo",
    step3: "Adjust the crop area by dragging",
    step4: "Click Process & Download — done!",
    howFootnote: "All processing happens in your browser — your photos are never uploaded to any server.",

    // PhotoProcessor
    targetRequirements: "Target Requirements",
    dimensions: "Dimensions",
    fileSize: "File Size",
    format: "Format",
    dropHere: "Drop your photo here",
    dropOr: "or click to browse from your device",
    dropFormats: "JPG, PNG, WEBP supported",
    dropSignature: "Drop your signature photo here",
    dragToAdjust: "Drag the highlighted area to adjust the crop",
    processing: "Processing your photo…",
    fitWidth: "Fit Width",
    zoomOut: "Zoom Out (Add Padding)",
    runCheck: "Run Compliance Check",
    analyzing: "Analyzing...",
    aiWorking: "AI Working...",
    detectingFace: "Detecting Face...",
    downloadApproved: "Download Approved Media",
    change: "Change",
    preDownloadChecks: "Pre-Download Checks",
    autoAnalyzed: "Auto-Analyzed",
    final: "Final",
    maxKB: "max",
    bgRemoved: "Background Removed",
    original: "Original",
    cleanSignature: "🪄 Clean Signature (High Contrast)",
    cleanSignatureDesc: "Removes paper shadows and makes ink crisp for portals",
    tipsTitle: "Tips for a good photo",
    tip1: "Use natural daylight facing a window",
    tip2: "Keep a neutral expression with mouth closed",
    tip3: "Ensure both ears are visible",
    tip4: "Wear formal clothing (no T-shirts)",
    tip5: "Avoid filters or effects on your photo",
    
    // Print sheet
    printSheetTitle: "Print-Ready Sheet",
    printSheetDesc: "4R paper (4×6 in) with cutting guides • Take to any print shop — ₹5–10",
    photos: "photos",

    // Footer
    footerPrivacy: "100% Free • No Upload to Server • Works Offline • Made in India 🇮🇳",
    footerTagline: "PhotoSarkari — Your trusted free tool for Indian government photo requirements",

    // Language switcher
    langLabel: "भाषा / Language",
  },
  hi: {
    siteName: "फोटोसरकारी",
    siteTagline: "मुफ्त भारतीय आईडी फोटो टूल",
    siteSubtag: "मुफ्त • सुरक्षित • तेज़",
    siteDescription: "आधार, पैन कार्ड, पासपोर्ट, वोटर आईडी और परीक्षा फॉर्म के लिए फोटो को सही साइज में बदलें — मुफ्त, तुरंत, बिना अपलोड।",

    trustFree: "100% मुफ्त",
    trustNoUpload: "कोई सर्वर अपलोड नहीं",
    trustOffline: "ऑफलाइन काम करता है",
    trustMadeIn: "भारत में निर्मित 🇮🇳",

    sectionPhotos: "आईडी कार्ड और परीक्षा फोटो",
    sectionSignatures: "हस्ताक्षर क्रॉप",
    sectionUtilities: "एडवांस्ड यूटिलिटीज",
    sectionGuides: "फोटो साइज गाइड",
    newTool: "नया टूल",
    aadhaarMergerTitle: "आधार PDF मर्जर",
    aadhaarMergerDesc: "पैन आवेदन के लिए आधार के आगे और पीछे के स्कैन को एक A4 PDF में जोड़ें।",
    readGuide: "पूरी गाइड पढ़ें →",

    howItWorks: "कैसे काम करता है",
    step1: "ऊपर दस्तावेज़ का प्रकार चुनें",
    step2: "अपनी फोटो अपलोड करें या ड्रैग करें",
    step3: "ड्रैग करके क्रॉप एरिया एडजस्ट करें",
    step4: "प्रोसेस और डाउनलोड पर क्लिक करें — हो गया!",
    howFootnote: "सारी प्रोसेसिंग आपके ब्राउज़र में होती है — आपकी फोटो कभी किसी सर्वर पर अपलोड नहीं होती।",

    targetRequirements: "लक्ष्य आवश्यकताएं",
    dimensions: "आयाम",
    fileSize: "फ़ाइल साइज",
    format: "फॉर्मेट",
    dropHere: "अपनी फोटो यहाँ ड्रॉप करें",
    dropOr: "या अपने डिवाइस से ब्राउज़ करें",
    dropFormats: "JPG, PNG, WEBP सपोर्टेड",
    dropSignature: "अपने हस्ताक्षर की फोटो यहाँ ड्रॉप करें",
    dragToAdjust: "क्रॉप एडजस्ट करने के लिए हाइलाइटेड एरिया ड्रैग करें",
    processing: "आपकी फोटो प्रोसेस हो रही है…",
    fitWidth: "चौड़ाई में फिट करें",
    zoomOut: "ज़ूम आउट (पैडिंग जोड़ें)",
    runCheck: "कंप्लायंस चेक चलाएं",
    analyzing: "विश्लेषण हो रहा है...",
    aiWorking: "AI काम कर रहा है...",
    detectingFace: "चेहरा खोज रहा है...",
    downloadApproved: "स्वीकृत मीडिया डाउनलोड करें",
    change: "बदलें",
    preDownloadChecks: "डाउनलोड से पहले जांच",
    autoAnalyzed: "ऑटो-विश्लेषित",
    final: "अंतिम",
    maxKB: "अधिकतम",
    bgRemoved: "बैकग्राउंड हटाया गया",
    original: "मूल फोटो",
    cleanSignature: "🪄 स्वच्छ हस्ताक्षर (हाई कॉन्ट्रास्ट)",
    cleanSignatureDesc: "पोर्टल के लिए कागज की छाया हटाता है और स्याही को स्पष्ट बनाता है",
    tipsTitle: "अच्छी फोटो के लिए सुझाव",
    tip1: "खिड़की की ओर मुंह करके प्राकृतिक रोशनी का उपयोग करें",
    tip2: "मुंह बंद रखें और सामान्य भाव रखें",
    tip3: "सुनिश्चित करें कि दोनों कान दिखें",
    tip4: "फॉर्मल कपड़े पहनें (टी-शर्ट नहीं)",
    tip5: "फोटो पर फ़िल्टर या इफ़ेक्ट का उपयोग न करें",

    printSheetTitle: "प्रिंट-रेडी शीट",
    printSheetDesc: "4R कागज (4×6 इंच) कटिंग गाइड के साथ • किसी भी प्रिंट शॉप पर ले जाएं — ₹5–10",
    photos: "फोटो",

    footerPrivacy: "100% मुफ्त • कोई सर्वर अपलोड नहीं • ऑफलाइन काम करता है • भारत में निर्मित 🇮🇳",
    footerTagline: "फोटोसरकारी — भारतीय सरकारी फोटो आवश्यकताओं के लिए आपका भरोसेमंद मुफ्त टूल",

    langLabel: "भाषा / Language",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] || translations.en[key] || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
