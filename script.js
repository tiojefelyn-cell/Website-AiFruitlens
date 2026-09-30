// ========================================
// FRUITLENS AI
// ========================================


// ========================================
// MODEL URL
// ========================================

const MODEL_URL =
    "https://teachablemachine.withgoogle.com/models/A17A114Mq/";


// ========================================
// VARIABLE
// ========================================

let model = null;

let modelReady = false;

let selectedImage = null;


// ========================================
// ELEMENT HTML
// ========================================

const imageInput =
    document.getElementById("imageInput");

const preview =
    document.getElementById("preview");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const statusText =
    document.getElementById("statusText");

const resultCard =
    document.getElementById("resultCard");

const resultName =
    document.getElementById("resultName");

const confidenceText =
    document.getElementById("confidenceText");

const confidenceBar =
    document.getElementById("confidenceBar");

const fruitInfo =
    document.getElementById("fruitInfo");

const fruitBenefits =
    document.getElementById("fruitBenefits");

const fruitFact =
    document.getElementById("fruitFact");

const fruitWhen =
    document.getElementById("fruitWhen");

const secondOpinion =
    document.getElementById("secondOpinion");

const matchSelect =
    document.getElementById("matchSelect");

const matchResults =
    document.getElementById("matchResults");

const historyList =
    document.getElementById("historyList");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");


// ========================================
// DATA BUAH
// ========================================

const fruitData = {

    apel: {
        name: "Apel 🍎",
        description:
            "Apel mengandung vitamin C dan serat.",
        benefits:
            "Dapat menjadi bagian dari pola makan yang sehat.",
        fact:
            "Apel memiliki banyak varietas dengan rasa yang berbeda.",
        when:
            "Cocok sebagai camilan sehari-hari."
    },

    pisang: {
        name: "Pisang 🍌",
        description:
            "Pisang mengandung vitamin B6 dan kalium.",
        benefits:
            "Dapat menjadi sumber energi dan kalium.",
        fact:
            "Pisang termasuk buah yang biasanya dipanen sebelum matang sepenuhnya.",
        when:
            "Cocok sebagai camilan sebelum atau setelah beraktivitas."
    },

    mangga: {
        name: "Mangga 🥭",
        description:
            "Mangga mengandung vitamin C dan vitamin A.",
        benefits:
            "Dapat membantu menambah variasi buah dalam pola makan.",
        fact:
            "Mangga memiliki banyak varietas.",
        when:
            "Cocok sebagai buah segar atau camilan."
    },

    semangka: {
        name: "Semangka 🍉",
        description:
            "Semangka memiliki kandungan air yang tinggi dan mengandung vitamin C.",
        benefits:
            "Dapat membantu memenuhi kebutuhan cairan dari makanan.",
        fact:
            "Sebagian besar daging semangka terdiri dari air.",
        when:
            "Cocok saat cuaca panas atau setelah beraktivitas."
    },

    anggur: {
        name: "Anggur 🍇",
        description:
            "Anggur mengandung vitamin C dan vitamin K.",
        benefits:
            "Dapat menjadi bagian dari pola makan yang beragam.",
        fact:
            "Anggur tersedia dalam berbagai warna.",
        when:
            "Cocok sebagai camilan sehari-hari."
    },

    nanas: {
        name: "Nanas 🍍",
        description:
            "Nanas merupakan buah tropis yang mengandung vitamin C.",
        benefits:
            "Dapat menjadi sumber vitamin C dari makanan.",
        fact:
            "Nanas tersusun dari banyak buah kecil yang menyatu.",
        when:
            "Cocok sebagai buah segar atau camilan."
    },

    jeruk: {
        name: "Jeruk 🍊",
        description:
            "Jeruk dikenal sebagai salah satu sumber vitamin C.",
        benefits:
            "Dapat membantu memenuhi kebutuhan vitamin C.",
        fact:
            "Ada banyak jenis jeruk dengan rasa yang berbeda.",
        when:
            "Cocok sebagai buah segar atau camilan."
    },

    stroberi: {
        name: "Stroberi 🍓",
        description:
            "Stroberi mengandung vitamin C dan serat.",
        benefits:
            "Dapat menjadi pilihan buah yang beragam.",
        fact:
            "Bagian yang terlihat seperti biji di permukaan stroberi sebenarnya adalah buah kecil.",
        when:
            "Cocok sebagai camilan."
    }

};


// ========================================
// LOAD MODEL
// ========================================

async function loadModel() {

    try {

        statusText.innerText =
            "🤖 Menghubungkan ke AI...";


        // Cek TensorFlow
        if (typeof tf === "undefined") {

            throw new Error(
                "TensorFlow.js tidak termuat."
            );

        }


        statusText.innerText =
            "🤖 Menyiapkan Teachable Machine...";


        // Cek Teachable Machine
        if (typeof tmImage === "undefined") {

            throw new Error(
                "Teachable Machine tidak termuat."
            );

        }


        statusText.innerText =
            "🤖 Mengunduh model AI...";


        console.log(
            "Memulai loading model..."
        );

        console.log(
            "Model URL:",
            MODEL_URL
        );


        // Load model
        model = await tmImage.load(

            MODEL_URL + "model.json",

            MODEL_URL + "metadata.json"

        );


        // Berhasil
        modelReady = true;


        statusText.innerText =
            "✅ AI siap digunakan";


        analyzeBtn.disabled = false;


        console.log(
            "✅ MODEL BERHASIL DIMUAT"
        );


    } catch (error) {

        console.error(
            "❌ MODEL ERROR:",
            error
        );


        modelReady = false;

        analyzeBtn.disabled = true;


        statusText.innerText =
            "❌ AI gagal dimuat";


        alert(
            "AI gagal dimuat.\n\n" +
            error.message
        );

    }

}


// ========================================
// PILIH FOTO
// ========================================

imageInput.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        selectedImage = file;


        const reader =
            new FileReader();


        reader.onload =
            function (e) {

                preview.src =
                    e.target.result;

                preview.style.display =
                    "block";


                resultCard.style.display =
                    "none";


                statusText.innerText =
                    modelReady
                        ? "📸 Foto siap dianalisis"
                        : "🤖 AI masih memuat...";

            };


        reader.readAsDataURL(file);

    }
);


// ========================================
// ANALISIS
// ========================================

analyzeBtn.addEventListener(
    "click",
    async function () {

        if (!modelReady || !model) {

            alert(
                "AI belum siap.\n\n" +
                "Tunggu sampai muncul " +
                "'AI siap digunakan'."
            );

            return;
        }


        if (!selectedImage) {

            alert(
                "Silakan pilih foto buah terlebih dahulu."
            );

            return;
        }


        analyzeBtn.disabled = true;


        statusText.innerText =
            "🤖 AI sedang menganalisis...";


        try {

            // Buat gambar
            const image =
                new Image();


            image.src =
                URL.createObjectURL(
                    selectedImage
                );


            // Tunggu gambar selesai
            await new Promise(
                function (resolve, reject) {

                    image.onload =
                        resolve;

                    image.onerror =
                        reject;

                }
            );


            console.log(
                "Mulai prediction..."
            );


            // Prediction
            let predictions =
                await model.predict(
                    image
                );


            // Urutkan
            predictions.sort(
                function (a, b) {

                    return (
                        b.probability -
                        a.probability
                    );

                }
            );


            console.log(
                "Predictions:",
                predictions
            );


            const best =
                predictions[0];


            const second =
                predictions[1];


            const confidence =
                best.probability * 100;


            showResult(
                best.className,
                confidence,
                second
            );


            saveHistory(
                best.className,
                confidence
            );


            statusText.innerText =
                "✅ Analisis selesai";


            URL.revokeObjectURL(
                image.src
            );


        } catch (error) {

            console.error(
                "❌ PREDICTION ERROR:",
                error
            );


            statusText.innerText =
                "❌ Gagal menganalisis";


            alert(
                "Gagal menganalisis foto.\n\n" +
                error.message
            );

        }


        analyzeBtn.disabled = false;

    }
);


// ========================================
// TAMPILKAN HASIL
// ========================================

function showResult(
    label,
    confidence,
    second
) {

    resultCard.style.display =
        "block";


    const key =
        normalizeFruitName(label);


    const percentage =
        Math.round(confidence);


    // Nama
    if (fruitData[key]) {

        resultName.innerText =
            fruitData[key].name;

    } else {

        resultName.innerText =
            "❓ Tidak dikenali";

    }


    // Confidence
    confidenceText.innerText =
        percentage + "%";


    confidenceBar.style.width =
        percentage + "%";


    // ====================================
    // INFO
    // ====================================

    if (
        !fruitData[key] ||
        confidence < 70
    ) {

        fruitInfo.innerText =
            "AI belum cukup yakin dengan hasil foto ini.";

        fruitBenefits.innerText =
            "Coba gunakan foto yang lebih jelas.";

        fruitFact.innerText =
            "Pastikan buah terlihat jelas dan pencahayaan cukup.";

        fruitWhen.innerText =
            "Coba scan kembali dengan foto yang berbeda.";

    } else {

        const fruit =
            fruitData[key];


        fruitInfo.innerText =
            fruit.description;


        fruitBenefits.innerText =
            fruit.benefits;


        fruitFact.innerText =
            fruit.fact;


        fruitWhen.innerText =
            fruit.when;

    }


    // ====================================
    // SECOND OPINION
    // ====================================

    if (!second) {

        secondOpinion.innerHTML =
            "Tidak ada prediksi kedua.";

        return;

    }


    const secondPercentage =
        Math.round(
            second.probability * 100
        );


    const gap =
        confidence -
        second.probability * 100;


    let status;
    let className;


    if (
        confidence >= 85 &&
        gap >= 30
    ) {

        status =
            "🟢 Hasil cukup konsisten";

        className =
            "good";

    } else if (
        confidence >= 70 &&
        gap >= 15
    ) {

        status =
            "🟡 Perlu diperhatikan";

        className =
            "warning";

    } else {

        status =
            "🔴 AI masih ragu";

        className =
            "bad";

    }


    secondOpinion.innerHTML = `

        <div class="opinion-status ${className}">
            ${status}
        </div>

        <div class="prediction-box">

            <strong>Prediksi utama</strong>

            <br>

            ${getFruitDisplayName(label)}
            — ${percentage}%

        </div>

        <div class="prediction-box">

            <strong>Prediksi kedua</strong>

            <br>

            ${getFruitDisplayName(second.className)}
            — ${secondPercentage}%

        </div>

    `;

}


// ========================================
// NORMALISASI NAMA
// ========================================

function normalizeFruitName(label) {

    const text =
        String(label)
            .toLowerCase()
            .trim();


    if (text.includes("apel"))
        return "apel";


    if (text.includes("pisang"))
        return "pisang";


    if (text.includes("mangga"))
        return "mangga";


    if (text.includes("semangka"))
        return "semangka";


    if (text.includes("anggur"))
        return "anggur";


    if (text.includes("nanas"))
        return "nanas";


    if (text.includes("jeruk"))
        return "jeruk";


    if (
        text.includes("stroberi") ||
        text.includes("strawberry")
    )
        return "stroberi";


    return null;

}


// ========================================
// NAMA UNTUK DITAMPILKAN
// ========================================

function getFruitDisplayName(label) {

    const key =
        normalizeFruitName(label);


    if (key && fruitData[key]) {

        return fruitData[key].name;

    }


    return label;

}


// ========================================
// FRUIT MATCH
// ========================================

const matchData = {

    refreshing: [

        {
            fruit: "Semangka 🍉",
            reason:
                "Memiliki kandungan air yang tinggi."
        },

        {
            fruit: "Jeruk 🍊",
            reason:
                "Memiliki rasa segar dan mengandung vitamin C."
        },

        {
            fruit: "Stroberi 🍓",
            reason:
                "Memiliki rasa segar dan mengandung vitamin C."
        }

    ],


    vitaminC: [

        {
            fruit: "Jeruk 🍊",
            reason:
                "Dikenal sebagai salah satu sumber vitamin C."
        },

        {
            fruit: "Stroberi 🍓",
            reason:
                "Mengandung vitamin C."
        },

        {
            fruit: "Mangga 🥭",
            reason:
                "Mengandung vitamin C dan vitamin A."
        }

    ],


    snack: [

        {
            fruit: "Apel 🍎",
            reason:
                "Praktis sebagai camilan sehari-hari."
        },

        {
            fruit: "Pisang 🍌",
            reason:
                "Mudah dibawa dan dikonsumsi."
        },

        {
            fruit: "Anggur 🍇",
            reason:
                "Praktis untuk dijadikan camilan."
        }

    ],


    activity: [

        {
            fruit: "Pisang 🍌",
            reason:
                "Mengandung karbohidrat dan kalium."
        },

        {
            fruit: "Semangka 🍉",
            reason:
                "Memiliki kandungan air yang tinggi."
        },

        {
            fruit: "Jeruk 🍊",
            reason:
                "Mengandung air dan vitamin C."
        }

    ],


    fiber: [

        {
            fruit: "Apel 🍎",
            reason:
                "Mengandung serat."
        },

        {
            fruit: "Mangga 🥭",
            reason:
                "Mengandung serat."
        },

        {
            fruit: "Stroberi 🍓",
            reason:
                "Mengandung serat dan vitamin C."
        }

    ]

};


// ========================================
// FRUIT MATCH EVENT
// ========================================

matchSelect.addEventListener(
    "change",
    function () {

        const value =
            matchSelect.value;


        if (!value) {

            matchResults.innerHTML =
                "";

            return;

        }


        const results =
            matchData[value];


        matchResults.innerHTML =
            results.map(
                function (item, index) {

                    return `

                        <div class="match-item">

                            <strong>
                                ${index + 1}.
                                ${item.fruit}
                            </strong>

                            <p>
                                ${item.reason}
                            </p>

                        </div>

                    `;

                }
            ).join("");

    }
);


// ========================================
// HISTORY
// ========================================

function saveHistory(
    label,
    confidence
) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "fruitLensHistory"
            )
        ) || [];


    history.unshift({

        label: label,

        confidence:
            Math.round(confidence),

        date:
            new Date().toLocaleString(
                "id-ID"
            )

    });


    // Maksimal 10
    history =
        history.slice(0, 10);


    localStorage.setItem(
        "fruitLensHistory",
        JSON.stringify(history)
    );


    displayHistory();

}


// ========================================
// TAMPILKAN HISTORY
// ========================================

function displayHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "fruitLensHistory"
            )
        ) || [];


    if (history.length === 0) {

        historyList.innerHTML =
            "<p>Belum ada riwayat scan.</p>";

        return;

    }


    historyList.innerHTML =
        history.map(
            function (item) {

                return `

                    <div class="history-item">

                        <strong>
                            ${getFruitDisplayName(
                                item.label
                            )}
                        </strong>

                        <span>
                            ${item.confidence}%
                        </span>

                        <small>
                            ${item.date}
                        </small>

                    </div>

                `;

            }
        ).join("");

}


// ========================================
// HAPUS HISTORY
// ========================================

clearHistoryBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "fruitLensHistory"
        );


        displayHistory();

    }
);


// ========================================
// MULAI
// ========================================

displayHistory();

loadModel();