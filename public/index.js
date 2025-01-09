const url = 'https://jeyoung.netlify.app/api';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value.trim();
    const age = document.getElementById('age').value.trim();
    const myModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));

    const response = await fetch(url + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, gender, age })
    });

    const result = await response.json();

    if (response.ok) {
        myModal.hide();
    }
    alert(result.message);
}

async function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const gender = document.getElementById('gender');
    const result_gender = gender.options[gender.selectedIndex].text.trim();
    const ageInput = document.getElementById('age');
    ageInput.addEventListener('input', function () {
        const age = ageInput.value;
        console.log(`입력된 나이: ${age}`);
    });

    alert(ageInput)

    // 간단한 검증
    if (!username || !email || !password || password !== confirmPassword || !gender || !age) {
        alert('모든 필드를 올바르게 입력해주세요.');
        return;
    }

    try {
        // POST 요청
        const response = await fetch(url + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                gender: gender,
                age: age,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('회원가입 성공: ' + result.message);

            // 모달 닫기
            const myModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            myModal.hide();

            // 입력 필드 초기화
            document.getElementById('registerUsername').value = '';
            document.getElementById('email').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            document.getElementById('gender').value = '성별 선택';
            document.getElementById('age').value = '';

        } else {
            const error = await response.json();
            alert('회원가입 실패: ' + error.message);
        }
    } catch (err) {
        console.error('오류 발생:', err);
        alert('서버와의 통신 중 문제가 발생했습니다.');
    }
}
