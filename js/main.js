const progressDiv = document.querySelector(".progress-div"),
    progressBar = document.querySelectorAll(".progress-bar");

ScrollOut({
    targets: ".progress-div",
});

window.addEventListener("scroll", function () {
    if (progressDiv.dataset.scroll == "in") {
        progressBar.forEach(el => {
            let valueNow = el.getAttribute("aria-valuenow")
            el.style.width = valueNow + "%";
            let CounterSpan = el.parentElement.parentElement.querySelector(".progress-value span");
            let Timer = setInterval(() => {
                if (Number(CounterSpan.textContent) < valueNow) {
                    CounterSpan.textContent = Number(CounterSpan.textContent) + 1;
                }
                else {
                    clearInterval(Timer)
                }
            }, 500)
        }
        )
    }
    else {
        progressBar.forEach(el => {
            el.style.width = 0 + "%"
            el.parentElement.parentElement.querySelector(".progress-value span").textContent = 0
        } )
        
    }
})
// 1. إغلاق القائمة عند الضغط خارج الـ Navbar
document.addEventListener('click', function (event) {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // التأكد من أن القائمة مفتوحة وأن الضغط تم خارج القائمة وزر التبديل
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// 2. إغلاق القائمة تلقائياً عند الضغط على أي رابط داخلها (Nav Link)
document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); // منع القفز الافتراضي
                
                // حساب ارتفاع الـ Navbar تلقائياً على أي شاشة
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                
                // حساب موقع السكشن بدقة مع خصم ارتفاع الـ Navbar
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navbarHeight - 15; // 15px مسافة جمالية للأعلى

                // الانتقال السلس للمكان الصحيح
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

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

// إغلاق القائمة عند الضغط على أي رابط
document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});
// =========================================================
// تحديث الزر النشط (Active Link) في الناف بار تلقائياً أثناء السكرول (ScrollSpy)
// =========================================================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 90;

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 60; // إزاحة المسافة
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});