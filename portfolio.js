// =========================================================================
// 📊 ၁။ PROJECTS & LAB ASSIGNMENTS DATA (ဇယားထဲတွင် ပြသမည့် ဒေတာစုစုပေါင်း)
// =========================================================================
const projectData = [
    { id: 1, title: "PostgreSQL Database Setup & Log Tables", date: "2026-04-12" },
    { id: 2, title: "Odoo 19 Server Configuration & Custom Module", date: "2026-04-05" },
    { id: 3, title: "NexusFlow Supply Chain Sequence Diagram", date: "2026-03-18" },
    { id: 4, title: "Linear Regression Lab - UI Train Test Data", date: "2026-02-22" },
    { id: 5, title: "Persuasive Technology Presentation Concept", date: "2026-01-15" }
];

// HTML Elements များကို လှမ်းဖမ်းခြင်း
const tableBody = document.getElementById('table-body');
const sortSelect = document.getElementById('sort-select');
const tabButtons = document.querySelectorAll('.tab-btn');
const contentBoxes = document.querySelectorAll('.content-box');
const toastAlert = document.getElementById('toast-alert');

let toastTimeout;

// =========================================================================
// 🔄 ၂။ DYNAMIC DATA TABLE RENDER LOGIC (ဇယားကွက် ပုံဖော်ခြင်း)
// =========================================================================
function renderProjects(data) {
    tableBody.innerHTML = ""; // ဇယားအဟောင်းကို အကုန်ရှင်းထုတ်ခြင်း

    data.forEach(project => {
        const row = `
            <tr>
                <td><b>${project.title}</b></td>
                <td>📅 ${project.date}</td>
                <td><button class="btn-sm toast-trigger" data-msg="Viewing: ${project.title}">View Info</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Table ထဲက ခလုတ်အသစ်တွေကို Toast Alert စနစ်နှင့် ပြန်လည်ချိတ်ဆက်ခြင်း
    initToastTriggers();
}

// =========================================================================
// 📅 ၃။ DATE SORTING LOGIC (ရက်စွဲအလိုက် စီခြင်းစနစ်)
// =========================================================================
sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    let sortedData = [...projectData]; // မူရင်းဒေတာမပျက်စေရန် Clone ပွားခြင်း

    if (value === 'asc') {
        // အဟောင်းဆုံးရက်မှ အသစ်ဆုံးသို့ (Oldest First)
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        //showToast("Sorted by Oldest First 📅");
    } else if (value === 'desc') {
        // အသစ်ဆုံးရက်မှ အဟောင်းဆုံးသို့ (Newest First)
        sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        //("Sorted by Newest First 🚀");
    }

    renderProjects(sortedData); // စီပြီးသားဒေတာဖြင့် UI ကို ပြန်ဆွဲခြင်း
});

// =========================================================================
// 🔄 ၄။ TAB MENU SWITCH LOGIC (Tab ခလုတ်များ အဖွင့်အပိတ်စနစ်)
// =========================================================================
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // (က) ရှိသမျှ Tab Buttons အကုန်လုံးထံမှ active class ကို ဖယ်ထုတ်ခြင်း
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // (ခ) ရှိသမျှ Content Box များကို အကုန်ပြန်ဝှက်ထားခြင်း
        contentBoxes.forEach(box => box.classList.remove('active'));

        // (ဂ) လက်ရှိနှိပ်လိုက်သော ခလုတ်ကို active ပေးခြင်း
        button.classList.add('active');
        
        // (ဃ) နှိပ်လိုက်သောခလုတ်၏ data-target ထဲက ID အတိုင်း လိုက်ရှာပြီး Content Box ကို ဖွင့်ပေးခြင်း
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');

        showToast(`Switched to ${button.innerText} Box 📂`);
    });
});

// =========================================================================
// 📌 ၅။ DYNAMIC TOAST ALERT LOGIC (offsetHeight သုံး၍ Timer ဖြင့် နှိုးခြင်း)
// =========================================================================
// ဝဘ်ဆိုက်စပွင့်ချင်းမှာ Toast Box ရဲ့ အမြင့်အစစ်ကို အော်တိုတိုင်းယူခြင်း
const toastHeight = 80; // ခန့်မှန်းခြေ အမြင့်ကို အသေပေးလိုက်ခြင်း
toastAlert.style.transform = `translate(-50%, ${toastHeight}px)`;
function showToast(message) {
    clearTimeout(toastTimeout); // အဟောင်း Timer ရှိနေပါက ဖျက်ဆီးခြင်း

    // စာသားအသစ်လဲလှယ်ခြင်း
    toastAlert.querySelector('.toast-message').innerText = message;

    // Toast Alert ကို အပေါ်သို့ အိခနဲ မြှင့်တင်ပြသခြင်း
    toastAlert.style.opacity = '1';
    toastAlert.style.transform = 'translate(-50%, -30px)'; // အောက်ခြေမှ 30px အကွာသို့ တက်လာမည်

    // ၃ စက္ကန့်ပြည့်လျှင် အလိုအလျောက် ပြန်ငုပ်လျှိုးသွားစေခြင်း
    toastTimeout = setTimeout(() => {
        toastAlert.style.opacity = '0';
        toastAlert.style.transform = `translate(-50%, ${toastHeight}px)`;
    }, 3000);
}

// Table ထဲက View Info ခလုတ်များနှိပ်လျှင် Toast ပေါ်စေမည့် လုပ်ဆောင်ချက်
function initToastTriggers() {
    document.querySelectorAll('.toast-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const msg = e.target.getAttribute('data-msg');
            //showToast(msg);
        });
    });
}

// =========================================================================
// 🚀 ၆။ INITIALIZATION (ဝဘ်ဆိုက်စဖွင့်ချိန်တွင် ကြိုတင်မောင်းနှင်မည့် ကုဒ်များ)
// =========================================================================
// ပထမဆုံး ပရောဂျက်ဇယားကွက်ကို မူရင်းအတိုင်း ဆွဲတင်ပြသထားခြင်း
renderProjects(projectData);

// စဖွင့်ချင်း Welcome Message အနေဖြင့် ၁ စက္ကန့်အကြာတွင် Toast လေး ပြသခိုင်းခြင်း
setTimeout(() => {
    showToast("Welcome to Kyaw Zin Htun's Portfolio! 👨‍💻");
}, 2000);
// =========================================================================
// 🎬 VANILLA JS SLIDESHOW LOGIC
// =========================================================================
let slideIndex = 1;

// ဝဘ်ဆိုက်ပွင့်ပွင့်ချင်း ပထမဆုံး Slide ကို ကြိုပြထားရန် နှိုးခြင်း
showSlides(slideIndex);

// မြှားခလုတ် နှိပ်သည့်အခါ ခေါ်မည့် Function (+1 သို့မဟုတ် -1 ဝင်လာမည်)
function moveSlide(n) {
    showSlides(slideIndex += n);
    
}

// အစက်လေးတွေ နှိပ်သည့်အခါ တိုက်ရိုက်သွားမည့် Function
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("my-slide");
    let dots = document.getElementsByClassName("dot");

    // Index က ကုန်သွားရင် ပထမဆုံးပတ်လမ်းကို ပြန်ပို့ခြင်း (Infinite Loop)
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // ရှိသမျှ Slide အကုန်လုံးကို အရင် ဝှက်ပစ်ခြင်း
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // ရှိသမျှ အစက်လေးတွေဆီက Active အရောင်ကို ဖယ်ထုတ်ခြင်း
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // လက်ရှိပြရမည့် Slide တစ်ခုတည်းကို ပြသပြီး အစက်လေးကို အရောင်လင်းစေခြင်း
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}