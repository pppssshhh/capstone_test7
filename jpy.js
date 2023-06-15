
function callJPYAPI() {
    const button = document.querySelector("button");
    button.disabled = true; // API 요청 중복 실행 방지

    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const image = event.target.result.split(",")[1];

        axios({
            method: "POST",
            url: "https://detect.roboflow.com/jpy/1",
            params: {
                api_key: "PfIvNupC996GClMCRkkl",
            },
            data: image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(function (response) {
                const jsonData = response.data;
                const classNames = jsonData.predictions.map((prediction) => prediction.class);

                if (classNames.length === 0) {
                    alert("국가를 재선택 해주세요");
                    button.disabled = false; // 버튼 활성화
                    return;
                }

                const resultDiv = document.getElementById("result");
                resultDiv.innerHTML = classNames.map((className, index) => {
                    const prediction = jsonData.predictions[index];
                    const value = prediction.value;
                    let multipliedValue;

                    if (className === "JPY_1000") {
                        multipliedValue = (1000 * jpy_price);
                    } else if (className === "JPY_10000") {
                        multipliedValue = (10000 * jpy_price);

                    } else if (className === "JPY_2000") {
                        multipliedValue = (2000 * jpy_price);

                    } else if (className === "JPY_5000") {
                        multipliedValue = (5000 * jpy_price);

                    } else if (value !== undefined) {
                        multipliedValue = value;

                    } else {
                        alert("국가를 재선택 해주세요.");
                        return;
                        // multipliedValue = "값이 없습니다.";; // 예외 처리
                    }

                    sum += multipliedValue; //합계에 값을 더해줌
                    
                    return "환전 계산 결과 <span class='multiplied-value'>  " + sum.toLocaleString() + " </span> 원 입니다";
                }).join(", ");

                const multipliedValueElements = document.getElementsByClassName("multiplied-value");
                for (let i = 0; i < multipliedValueElements.length; i++) {
                    multipliedValueElements[i].style.color = "red";
                    // TODO: 클래스 이름을 원하는 방식으로 처리
                }
            })
            .catch(function (error) {
                console.log(error.message);
            })
            .finally(function () {
                button.disabled = false; // API 요청 후 버튼 활성화
            });
    };

    // FileReader 로직 등록 및 실행
    reader.readAsDataURL(file);

    // 일본 JPY에 대한 API 호출 로직을 여기에 작성합니다.
    console.log("Call JPY API");
}