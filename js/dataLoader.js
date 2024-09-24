const host = "https://abdelfadeil.github.io/app/";
let news = [];
let articles = [];

// دالة لجلب البيانات من ملف YAML
async function loadYAMLData(url) {
    return new Promise(async (resolve, reject) => {
        try {
            // استخدام fetch لجلب البيانات من ملف YAML
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching YAML file: ${response.statusText}`);
            }

            // قراءة نص الملف
            const yamlText = await response.text();

            // تحويل النص من YAML إلى JSON باستخدام js-yaml
            const data = jsyaml.load(yamlText);

            // وضع البيانات في المتغيرات
            news = data.news || [];
            articles = data.articles || [];

            // حل الـ Promise بعد تحميل البيانات بنجاح
            resolve({ news, articles });

        } catch (error) {
            console.error("Error loading YAML data:", error);
            reject(error); // رفض الـ Promise إذا حدث خطأ
        }
    });
}

// استدعاء الدالة مع مسار ملف YAML
const dataPromise = loadYAMLData(host + 'data/data.yaml');
