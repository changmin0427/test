function loadContent(page) {
    const contentDiv = document.getElementById("content");
    const loadingDiv = document.getElementById("loading");

    loadingDiv.style.display = "block";

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;
            loadingDiv.style.display = "none";

            // 페이지 로드 후 필요한 JavaScript 함수 호출
            if (page === 'attendance.html') {
                // attendance.js 함수 호출
                loadAttendance();
            } else if (page === 'calendar.html') {
                // calendar.js 함수 호출
                loadCalendar();
            } else if (page === 'leave.html') {
                // leave.js 함수 호출
                loadLeave();
            }
        })
        .catch(error => {
            contentDiv.innerHTML = "컨텐츠를 불러오는 중 오류가 발생했습니다.";
            loadingDiv.style.display = "none";
            console.error('Error loading content:', error);
        });
}

function loadAttendance() {
    // attendance.js의 주요 기능 호출
    const attendanceList = document.getElementById("attendanceList");
    if (attendanceList) {
        const records = [
            { name: "김철수", status: "출근", time: "09:00" },
            { name: "이영희", status: "지각", time: "09:15" }
        ];

        attendanceList.innerHTML = records.map(record => `
            <p>${record.name} - ${record.status} (${record.time})</p>
        `).join('');
    }
}

function loadCalendar() {
    // calendar.js의 주요 기능 호출
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    renderCalendar(currentMonth, currentYear);

    function renderCalendar(month, year) {
        const calendarBody = document.getElementById("calendarBody");
        const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const leaveRequests = [
            { date: "2024-07-05", name: "김철수" },
            { date: "2024-07-12", name: "이영희" },
            { date: "2024-07-20", name: "박준형" }
        ];

        calendarBody.innerHTML = "";
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        document.getElementById("calendarTitle").innerText = `${months[month]} ${year}`;

        for (let i = 0; i < firstDay; i++) {
            calendarBody.innerHTML += `<div class="day"></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            let leaveInfo = leaveRequests.filter(lr => lr.date === dateStr)
                                         .map(lr => `<div class="event">${lr.name}</div>`)
                                         .join('');
            calendarBody.innerHTML += `<div class="day">
                <div class="date">${day}</div>
                ${leaveInfo}
            </div>`;
        }
    }

    document.querySelector(".calendar-header button:nth-child(1)").onclick = function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        renderCalendar(currentMonth, currentYear);
    };

    document.querySelector(".calendar-header button:nth-child(3)").onclick = function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        renderCalendar(currentMonth, currentYear);
    };
}

function loadLeave() {
    // leave.js의 주요 기능 호출
    const leaveForm = document.getElementById("leaveForm");
    const leaveRequestsDiv = document.getElementById("leaveRequests");

    if (leaveForm && leaveRequestsDiv) {
        leaveForm.onsubmit = function(event) {
            event.preventDefault();
            const leaveDate = document.getElementById("leaveDate").value;
            const leaveReason = document.getElementById("leaveReason").value;
            const leaveItem = `<div>
                <p>날짜: ${leaveDate}</p>
                <p>사유: ${leaveReason}</p>
            </div>`;
            leaveRequestsDiv.innerHTML += leaveItem;
        };
    }
}