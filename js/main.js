// 1. أنيميشن الـ Progress Bars عند السكرول
const progressDiv = document.querySelector(".progress-div"),
    progressBar = document.querySelectorAll(".progress-bar");

if (typeof ScrollOut !== "undefined") {
    ScrollOut({ targets: ".progress-div" });
}

window.addEventListener("scroll", function () {
    if (progressDiv && progressDiv.dataset.scroll == "in") {
        progressBar.forEach(el => {
            let valueNow = el.getAttribute("aria-valuenow");
            el.style.width = valueNow + "%";
            let CounterSpan = el.parentElement.parentElement.querySelector(".progress-value span");
            if (CounterSpan) {
                let Timer = setInterval(() => {
                    if (Number(CounterSpan.textContent) < valueNow) {
                        CounterSpan.textContent = Number(CounterSpan.textContent) + 1;
                    } else {
                        clearInterval(Timer);
                    }
                }, 20);
            }
        });
    } else if (progressDiv) {
        progressBar.forEach(el => {
            el.style.width = 0 + "%";
            let CounterSpan = el.parentElement.parentElement.querySelector(".progress-value span");
            if (CounterSpan) CounterSpan.textContent = 0;
        });
    }
});

// 2. الهبوط السلس مع خصم مسافة الـ Navbar
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                // ✅ السطر الصحيح لضبط بداية السيكشن تحت الناف بار بالظبط:
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 3. إغلاق القائمة في الموبايل عند الضغط خارجها أو على أي رابط
document.addEventListener('click', function (event) {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// 4. تفعيل زر السكشن النشط (Active Link) تلقائياً أثناء السكرول
// =========================================================
// تحديث الزر النشط (Active Link) فور فتح الصفحة وأثناء السكرول
// =========================================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 90;

    let currentSectionId = '';

    // إذا كنا في أعلى الصفحة، تحديد قسم الهيدر (Home) افتراضياً
    if (window.scrollY < 100) {
        currentSectionId = 'header';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 60;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// تشغيل الدالة فور فتح/تحميل الصفحة وأثناء السكرول
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('DOMContentLoaded', updateActiveNavLink);
updateActiveNavLink(); // تشغيل فوري
// =========================================================
// إرسال الفوم عبر AJAX مع Loading Pop-up بدون إعادة توجيه
// =========================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnSpinner = document.getElementById('btnSpinner');

        // 1. تفعيل حالة الـ Loading وتعطيل الزر لمنع الإرسال المتكرر
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnSpinner.classList.remove('d-none');

        const formData = new FormData(this);

        // الإرسال عبر FormSubmit AJAX
        fetch("https://formsubmit.co/ajax/davidsamir789@gmail.com", {
            method: "POST",
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // 2. إظهار الـ Pop-up وإعادة ضبط الخانات
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            contactForm.reset();
        })
        .catch(error => {
            alert("Oops! Something went wrong while sending your message. Please try again.");
            console.error('Error:', error);
        })
        .finally(() => {
            // 3. إرجاع الزر لحالته الطبيعية بعد انتهاء العملية
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnSpinner.classList.add('d-none');
        });
    });
}