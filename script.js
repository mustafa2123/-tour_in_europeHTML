
function smoothScrollToElement(elementId) {
const targetElement = document.getElementById(elementId);
if (targetElement) {
    const offset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
    });
} else {
    console.warn(`Элемент с id "${elementId}" не найден`);
}
}


const allNavButtons = document.querySelectorAll('[data-target]');
allNavButtons.forEach(button => {
button.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('data-target');
    if (targetId) {
        smoothScrollToElement(targetId);
    }
});
});

console.log('Навигация готова: клик по кнопкам меню плавно переносит к секциям');


const navMenu = document.querySelectorAll('.nadvigmeny button, #bt1');
navMenu.forEach(btn => {
btn.addEventListener('click', (e) => {
    
    e.preventDefault();
});
});

const modal = document.getElementById('modal');
const userNameInput = document.getElementById('userName');
const userPhoneInput = document.getElementById('userPhone');
const modalUserName = document.getElementById('modalUserName');
const modalUserPhone = document.getElementById('modalUserPhone');
const feedbackForm = document.getElementById('feedbackForm');

function maskPhone(value) {
    let numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    
    let formatted = '+7 ';
    
    if (numbers.length > 1) {
        formatted += '(' + numbers.substring(1, 4);
    } else if (numbers.length === 1) {
        formatted += '(';
    }
    
    if (numbers.length >= 4) {
        formatted += ') ' + numbers.substring(4, 7);
    }
    
    if (numbers.length >= 7) {
        formatted += '-' + numbers.substring(7, 9);
    }
    
    if (numbers.length >= 9) {
        formatted += '-' + numbers.substring(9, 11);
    }
    
    return formatted;
}

if (userPhoneInput) {
    userPhoneInput.addEventListener('input', (e) => {
        let cursorPos = e.target.selectionStart;
        let oldLength = e.target.value.length;
        let masked = maskPhone(e.target.value);
        e.target.value = masked;
        
        let newLength = masked.length;
        let diff = newLength - oldLength;
        e.target.setSelectionRange(cursorPos + diff, cursorPos + diff);
    });
}

function openModal(name, phone) {
    modalUserName.textContent = name || 'гость';
    modalUserPhone.textContent = phone || 'не указан';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = userNameInput.value.trim();
        const phone = userPhoneInput.value.trim();
        
        if (!name) {
            alert('Пожалуйста, введите ваше имя');
            userNameInput.focus();
            return;
        }
        
        if (!phone || phone === '+7 ' || phone.length < 10) {
            alert('Пожалуйста, введите корректный номер телефона');
            userPhoneInput.focus();
            return;
        }
        
        openModal(name, phone);
        
        feedbackForm.reset();
        
        console.log('Заявка отправлена:', { name, phone });
    });
}

const closeSpan = document.querySelector('.modal-close');
if (closeSpan) {
    closeSpan.addEventListener('click', closeModal);
}

const closeBtn = document.querySelector('.modal-close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});