
function callUSDAPI() {
    const button = document.querySelector("button");
    button.disabled = true; // API 요청 중복 실행 방지

    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const image = event.target.result.split(",")[1];

        axios({
            method: "POST",
            url: "https://detect.roboflow.com/dollar-wdujc/3",
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

                    if (className === "one-front") {
                        multipliedValue = (1 * usd_price);
                    } else if (className === "one-back") {
                        multipliedValue = (1 * usd_price);

                    } else if (className === "five-front") {
                        multipliedValue = (5 * usd_price);
                    } else if (className === "five-back") {
                        multipliedValue = (5 * usd_price);

                    } else if (className === "ten-front") {
                        multipliedValue = (10 * usd_price);
                    } else if (className === "ten-back") {
                        multipliedValue = (10 * usd_price);

                    } else if (className === "fifty-front") {
                        multipliedValue = (50 * usd_price);
                    } else if (className === "five-back") {
                        multipliedValue = (50 * usd_price);

                    } else if (className === "twenty-front") {
                        multipliedValue = (20 * usd_price);
                    } else if (className === "twenty-back") {
                        multipliedValue = (20 * usd_price);

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

    console.log("Call USD API");

}