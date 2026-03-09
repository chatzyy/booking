// --- ส่วนที่ 1: ตั้งค่าส่วนกลาง (ทำงานทุกหน้า) ---
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date().toLocaleDateString('th-TH', options);

// ฟังก์ชันสำหรับเตรียมข้อมูลห้อง 24 ห้อง (ป้องกันกรณีข้อมูลสูญหาย)
function ensureDataExists() {
    const initialRooms = [
        { id: 'CE08401', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08402', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08403', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08404', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08405', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08406', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08407', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08408', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08409', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08410', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08411', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08412', name: 'ห้องอ่านหนังสือ', type: 'ห้องเดี่ยว', floor: '4', capacity: 1, maintenance: false },
        { id: 'CE08413', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '4', capacity: 10, maintenance: false },
        { id: 'CE08414', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '4', capacity: 10, maintenance: false },
        { id: 'CE08415', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '4', capacity: 10, maintenance: false },
        { id: 'CE08416', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '4', capacity: 10, maintenance: false },
        { id: 'CE08310', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08311', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08312', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08313', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08314', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08315', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08316', name: 'ห้องประชุม', type: 'ห้องกลุ่ม', floor: '3', capacity: 10, maintenance: false },
        { id: 'CE08317', name: 'ห้องคาราโอเกะ', type: 'ห้องกลุ่ม', floor: 'G', capacity: 5, maintenance: false }
    ];
    const storedRooms = JSON.parse(localStorage.getItem('libra_rooms') || '[]');
    if (storedRooms.length !== 24) {
        localStorage.setItem('libra_rooms', JSON.stringify(initialRooms));
    }
}

// --- ส่วนที่ 2: ตัวแบ่งการทำงานตามหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', () => {
    ensureDataExists(); // สร้างฐานข้อมูลห้องก่อนเริ่มทำงาน

    // 🔥 โค้ดดึงชื่อโปรไฟล์มาแสดงที่ Navbar โดยอัตโนมัติ
    const loggedInName = localStorage.getItem("loggedInName");
    if (loggedInName) {
        const userDisplay = document.getElementById("display-user-name");
        const adminDisplay = document.getElementById("display-admin-name");
        
        if (userDisplay) {
            userDisplay.innerHTML = `<i class="bx bx-user m-1 text-xl p-1 text-purple-600"></i>${loggedInName}`;
        }
        if (adminDisplay) {
            adminDisplay.innerHTML = `<i class="bx bx-user m-1 text-xl p-1 text-blue-600"></i>${loggedInName} (Admin)`;
        }
    }

    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "home_page.html" || currentPage === "home_page_admin.html" || currentPage === "" || currentPage === "index.html") {
        initHomePage();
    } else if (currentPage === "history_room.html" || currentPage === "history_room_admin.html") {
        initHistoryPage();
    } else if (currentPage === "history_room_2.html" || currentPage === "history_room_admin2.html") {
        initCompletedHistoryPage(); // 🌟 เพิ่มเงื่อนไขตรวจสอบหน้าประวัติ
    } else if (currentPage === "history_room_3.html") {
        initCanceledPage();
    }
});

// --- ส่วนที่ 3: ฟังก์ชันสำหรับหน้าแรก (Home Page) ---
function initHomePage() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.innerHTML = today;
        dateElement.dataset.rawDate = new Date().toISOString().split('T')[0];
    }

    const timeInSelect = document.getElementById('time_in');
    const timeOutSelect = document.getElementById('time_out');

    if (timeInSelect && timeOutSelect) {
        timeOutSelect.disabled = true;
        timeInSelect.addEventListener('change', () => {
            const selectedIndex = timeInSelect.selectedIndex;
            if (selectedIndex === 0) { 
                timeOutSelect.selectedIndex = 0;
                timeOutSelect.disabled = true;
                return;
            }
            timeOutSelect.disabled = false;
            let targetIndex = selectedIndex + 2;
            if (targetIndex >= timeOutSelect.options.length) {
                targetIndex = timeOutSelect.options.length - 1;
            }
            timeOutSelect.selectedIndex = targetIndex;
        });
    }

    // ==============================================================
    // 🔥 ระบบอัปเดตป้ายสถานะ ว่าง / ไม่ว่าง บนหน้าแรกแบบ Real-time
    // ==============================================================
    function updateRoomStatusUI() {
        const roomsData = JSON.parse(localStorage.getItem('libra_rooms') || '[]');
        const bookings = JSON.parse(localStorage.getItem('libra_bookings') || '[]');
        if (roomsData.length === 0) return;

        const currentDateStr = new Date().toISOString().split('T')[0];
        const currentTimeStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        const roomCards = document.querySelectorAll('#all_room > div');
        
        roomCards.forEach(card => {
            const btn = card.querySelector('button[data-room]');
            if (!btn) return;
            
            const roomId = btn.getAttribute('data-room');
            const roomData = roomsData.find(r => r.id === roomId);
            
            let isOccupied = false;
            let isMaintenance = false;
            
            if (roomData && roomData.maintenance) {
                isMaintenance = true;
            } else {
                // เช็คว่า ณ เวลานี้ มีการจองที่ยืนยันแล้วหรือไม่
                const todayBookings = bookings.filter(b => b.roomId === roomId && b.date === currentDateStr && b.status === 'confirmed');
                isOccupied = todayBookings.some(b => currentTimeStr >= b.timeIn && currentTimeStr < b.timeOut);
            }

            // หาหัวข้อ h1 เพื่อแทรกป้ายสถานะไปด้านข้าง
            const titleH1 = card.querySelector('h1.text-xl');
            if(!titleH1) return;
            
            const titleContainer = titleH1.parentElement;
            let badge = titleContainer.querySelector('.status-badge');
            
            if (!badge) {
                // จัดโครงสร้างให้เรียงซ้ายขวา
                titleContainer.classList.add('flex', 'justify-between', 'items-start', 'pr-5');
                const textWrapper = document.createElement('div');
                while (titleContainer.childNodes.length > 0) {
                    textWrapper.appendChild(titleContainer.childNodes[0]);
                }
                titleContainer.appendChild(textWrapper);

                badge = document.createElement('div');
                badge.className = 'status-badge pt-5'; // จัดระยะห่างด้านบนให้เท่ากับตัวหนังสือ
                titleContainer.appendChild(badge);
            }
            
            // วาดป้ายตามสถานะ
            if (isMaintenance) {
                badge.innerHTML = `<span class="bg-gray-200 text-gray-600 text-[11px] px-2.5 py-1 rounded-lg border border-gray-300 flex items-center gap-1 font-bold"><i class='bx bx-wrench'></i> ปิดปรับปรุง</span>`;
            } else if (isOccupied) {
                badge.innerHTML = `<span class="bg-red-100 text-red-700 text-[11px] px-2.5 py-1 rounded-lg border border-red-200 flex items-center gap-1 font-bold"><i class='bx bx-x-circle'></i> ไม่ว่าง</span>`;
            } else {
                badge.innerHTML = `<span class="bg-green-100 text-green-700 text-[11px] px-2.5 py-1 rounded-lg border border-green-200 flex items-center gap-1 font-bold"><i class='bx bx-check-circle'></i> ว่าง</span>`;
            }
        });
    }

    // สั่งให้ทำงานทันทีตอนโหลดหน้า
    updateRoomStatusUI();
    // ตั้งเวลาให้อัปเดตอัตโนมัติทุกๆ 1 นาที
    setInterval(updateRoomStatusUI, 60000);
    // ดักฟังการเปลี่ยนแปลง หากแอดมินกดยืนยันจากอีกหน้าต่าง หน้าต่างนี้จะอัปเดตสถานะทันที
    window.addEventListener('storage', updateRoomStatusUI);

    // ==============================================================
    // ระบบค้นหาและตัวกรอง 
    // ==============================================================
    const searchInput = document.getElementById('search');
    const roomTypeSelect = document.getElementById('room_type');
    const floorTypeSelect = document.getElementById('floor_type');
    const roomCards = document.querySelectorAll('#all_room > div');
    const noRoomMessage = document.getElementById('no_room_found');

    function filterRooms() {
        const searchText = searchInput.value.toLowerCase();
        const selectedType = roomTypeSelect.value;
        const selectedFloor = floorTypeSelect.value;
        let visibleCount = 0;

        roomCards.forEach(card => {
            const roomTitle = card.querySelector('h1.text-xl').textContent.toLowerCase();
            const roomDetail = card.querySelector('h1.text-gray-500').textContent.toLowerCase();
            const roomType = card.querySelector('.m-5 h1').textContent.trim();
            
            const matchesSearch = roomTitle.includes(searchText) || roomDetail.includes(searchText);
            const matchesType = (selectedType === 'all') || (roomType === selectedType);
            const matchesFloor = (selectedFloor === 'all') || (roomDetail.includes(selectedFloor.toLowerCase()));

            if (matchesSearch && matchesType && matchesFloor) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        if (noRoomMessage) {
            visibleCount === 0 ? noRoomMessage.classList.remove('hidden') : noRoomMessage.classList.add('hidden');
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterRooms);
        roomTypeSelect.addEventListener('change', filterRooms);
        floorTypeSelect.addEventListener('change', filterRooms);
    }

    const cancelBtn = document.getElementById("cancel");
    const bookModel = document.getElementById("book_model");
    if (cancelBtn) cancelBtn.addEventListener('click', closeModel);
    if (bookModel) {
        bookModel.addEventListener('click', (e) => {
            if (e.target === bookModel) closeModel();
        });
    }
}

// --- ส่วนที่ 4: ฟังก์ชันสำหรับหน้าการจอง (กำลังจอง/รอตรวจสอบ) ---
function initHistoryPage() {
    const bookingListContainer = document.getElementById('booking-container');
    const bookings = JSON.parse(localStorage.getItem('libra_bookings')) || [];
    
    // หน้ากำลังจอง ดึงเฉพาะ pending (รอตรวจสอบ) และ confirmed (ยืนยันแล้ว)
    const activeBookings = bookings.filter(b => b.status === "pending" || b.status === "confirmed");

    if (activeBookings.length > 0 && bookingListContainer) {
        bookingListContainer.innerHTML = '<div id="booking-grid" class="flex flex-col gap-4 w-full p-4"></div>';
        bookingListContainer.classList.remove('justify-center', 'items-center', 'h-48');
        
        const grid = document.getElementById('booking-grid');

        activeBookings.forEach(item => {
            let statusText = item.status === "pending" ? "รอแอดมินยืนยัน" : "จองสำเร็จ (ยืนยันแล้ว)";
            let statusColor = item.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800";

            grid.innerHTML += `
                <div class="border rounded-2xl p-5 shadow-sm flex justify-between items-center bg-white border-l-8 border-l-purple-800 text-left font-sans">
                    <div class="flex gap-4">
                        <div class="bg-gray-100 p-3 rounded-xl flex items-center justify-center w-16 h-16">
                             <i class="bx bx-door-open text-3xl text-purple-800"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg text-black text-left">ห้อง ${item.roomName} (${item.roomId})</h3>
                            <p class="text-gray-500 text-sm text-left italic">วัตถุประสงค์: ${item.purpose}</p>
                            <div class="flex gap-3 mt-2 font-medium">
                                <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">📅 ${item.dateText || item.date}</span>
                                <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">⏰ ${item.timeIn} - ${item.timeOut} น.</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="${statusColor} text-xs font-bold px-3 py-1 rounded-full uppercase">
                            ${statusText}
                        </span>
                        <button onclick="cancelBooking(${item.id})" class="text-red-500 text-sm hover:underline mt-2">ยกเลิกการจอง</button>
                    </div>
                </div>`;
        });
    }
}

// --- ส่วนที่ 5: ฟังก์ชันสำหรับหน้าประวัติที่ถูกยกเลิก (history_room_3.html) ---
function initCanceledPage() {
    const container = document.getElementById('canceled-booking-container');
    const bookings = JSON.parse(localStorage.getItem('libra_bookings')) || [];
    const canceledBookings = bookings.filter(b => b.status === "cancelled");

    if (canceledBookings.length > 0 && container) {
        container.innerHTML = '<div class="flex flex-col gap-4 w-full p-4"></div>';
        const grid = container.firstChild;
        container.classList.remove('justify-center', 'items-center', 'h-48');

        canceledBookings.forEach(item => {
            grid.innerHTML += `
                <div class="border rounded-2xl p-5 shadow-sm flex justify-between items-center bg-red-50 border-l-8 border-l-red-500 opacity-80 text-left font-sans">
                    <div class="flex gap-4">
                        <div class="bg-red-100 p-3 rounded-xl flex items-center justify-center w-16 h-16">
                             <i class="bx bx-x-circle text-3xl text-red-600"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg text-gray-800">ห้อง ${item.roomName} (${item.roomId})</h3>
                            <p class="text-gray-500 text-sm italic">สถานะ: ยกเลิกแล้ว</p>
                            <div class="flex gap-3 mt-2 font-medium">
                                <span class="text-xs bg-red-100 px-2 py-1 rounded text-red-600">${item.dateText || item.date}</span>
                                <span class="text-xs bg-red-100 px-2 py-1 rounded text-red-600">${item.timeIn} - ${item.timeOut} น.</span>
                            </div>
                        </div>
                    </div>
                    <span class="bg-red-200 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase">ยกเลิกแล้ว</span>
                </div>`;
        });
    }
}

// --- 🌟 ส่วนที่ 7: ฟังก์ชันสำหรับหน้าประวัติ (history_room_2.html / history_room_admin2.html) ---
function initCompletedHistoryPage() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return;

    const bookings = JSON.parse(localStorage.getItem('libra_bookings')) || [];
    
    // กรองเอาเฉพาะที่ status เป็น 'confirmed' (ยืนยันแล้ว) หรือ 'completed' (จบการจองแล้ว)
    const historyBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed');

    historyContainer.innerHTML = ''; // ล้างข้อมูลเก่าก่อนวาดใหม่
    
    // ปรับให้ Grid มีช่องว่างกำลังสวยงาม
    historyContainer.classList.add('gap-4');

    if (historyBookings.length === 0) {
        historyContainer.innerHTML = `<h1 class="text-gray-400 col-span-4 text-center mt-10 text-xl font-bold">ยังไม่มีประวัติการจองที่ได้รับการยืนยัน</h1>`;
        return;
    }

    // สร้างการ์ดประวัติ
    historyBookings.forEach(booking => {
        const card = document.createElement('div');
        
        // ตั้งค่าสีป้ายกำกับตามสถานะ
        const badgeColor = booking.status === 'completed' ? 'bg-gray-600' : 'bg-green-600';
        const badgeText = booking.status === 'completed' ? 'จบการจองแล้ว' : 'ยืนยันแล้ว';
        const badgeIcon = booking.status === 'completed' ? 'bx-history' : 'bx-check-circle';

        card.className = "border rounded-xl p-5 shadow bg-white w-full relative transition duration-300 hover:shadow-md";
        card.innerHTML = `
            <div class="absolute top-0 right-0 ${badgeColor} text-white px-3 py-1 rounded-bl-xl rounded-tr-xl text-xs font-bold flex items-center gap-1">
                <i class="bx ${badgeIcon}"></i> ${badgeText}
            </div>
            <h1 class="text-xl font-bold text-gray-700 mt-2">${booking.roomName || 'ห้องอ่านหนังสือ'}</h1>
            <h1 class="text-gray-500 text-sm">หมายเลข: ${booking.roomId}</h1>
            <div class="mt-3 bg-gray-100 p-2 rounded text-sm">
                <p class="text-gray-600 flex items-center gap-1"><i class="bx bx-calendar"></i> ${booking.dateText || booking.date}</p>
                <p class="text-gray-600 flex items-center gap-1"><i class="bx bx-time"></i> ${booking.timeIn || '-'} ถึง ${booking.timeOut || '-'} น.</p>
            </div>
        `;
        historyContainer.appendChild(card);
    });
}

// --- ส่วนที่ 6: ฟังก์ชัน Global สำหรับจัดการ Modal จองห้อง ---
let tempRoomName = ""; 

function autoFill(button) {
    const bookModel = document.getElementById("book_model");
    const roomNumber = button.dataset.room;
    
    const roomCard = button.closest('.w-80');
    if(roomCard) {
        tempRoomName = roomCard.querySelector('h1.text-xl').innerText.trim();
    }
    
    document.getElementById("floor_data").innerText = button.dataset.floor;
    document.getElementById("room_data").innerText = roomNumber;
    document.getElementById("store_data").innerText = button.dataset.store + " ที่นั่ง";
    
    const amenities = button.dataset.amenities;
    const amenitiesContainer = document.getElementById("amenities_data");
    if(amenitiesContainer) {
        amenitiesContainer.innerHTML = '';
        if(amenities) {
            amenities.split(',').forEach(item => {
                amenitiesContainer.innerHTML += `<span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs mr-1 mb-1 border border-purple-200">${item.trim()}</span>`;
            });
        }
    }

    const userName = localStorage.getItem('loggedInName') || 'ผู้ใช้งาน';
    const userNameElem = document.getElementById('curren-name');
    if(userNameElem) userNameElem.innerText = userName;

    const bookings = JSON.parse(localStorage.getItem('libra_bookings')) || [];
    const timeInSelect = document.getElementById('time_in');
    const timeOutSelect = document.getElementById('time_out');

    if (timeInSelect) timeInSelect.selectedIndex = 0;
    if (timeOutSelect) {
        timeOutSelect.selectedIndex = 0;
        timeOutSelect.disabled = true;
    }

    Array.from(timeInSelect.options).forEach(opt => {
        opt.disabled = false;
        opt.classList.remove('bg-gray-200', 'text-gray-400');
    });

    const todayRaw = document.getElementById('current-date').dataset.rawDate;
    const roomBookings = bookings.filter(b => b.roomId === roomNumber && b.status !== "cancelled" && b.date === todayRaw);

    roomBookings.forEach(booking => {
        const start = parseInt(booking.timeIn.split(':')[0]);
        const end = parseInt(booking.timeOut.split(':')[0]);

        Array.from(timeInSelect.options).forEach(option => {
            if(option.value !== "selected disabled") {
                const currentHour = parseInt(option.text.split(':')[0]);
                if (currentHour >= start && currentHour < end) {
                    option.disabled = true;
                    option.classList.add('bg-gray-200', 'text-gray-400');
                }
            }
        });
    });

    bookModel.classList.remove("hidden");
    bookModel.classList.add("flex");
    document.body.style.overflow = "hidden"; 
}

function closeModel() {
    const bookModel = document.getElementById("book_model");
    const timeInSelect = document.getElementById('time_in');
    const timeOutSelect = document.getElementById('time_out');
    const objectiveInput = document.getElementById('objective');

    if (timeInSelect) timeInSelect.selectedIndex = 0;
    if (timeOutSelect) {
        timeOutSelect.selectedIndex = 0;
        timeOutSelect.disabled = true;
    }
    if (objectiveInput) objectiveInput.value = "";

    bookModel.classList.replace("flex", "hidden");
    document.body.style.overflow = "auto";
}

function confirmBooking(event) {
    if (event) event.preventDefault();
    
    const timeInEl = document.getElementById('time_in');
    const timeOutEl = document.getElementById('time_out');
    const objectiveEl = document.getElementById('objective');

    if (timeInEl.selectedIndex === 0 || timeOutEl.selectedIndex === 0) {
        alert("กรุณาเลือกเวลาเข้าและเวลาออกให้ครบถ้วนก่อนทำการจอง");
        return;
    }

    const timeInText = timeInEl.options[timeInEl.selectedIndex].text;
    const timeOutText = timeOutEl.options[timeOutEl.selectedIndex].text;

    if (timeInText >= timeOutText) {
        alert("เวลาออกต้องมากกว่าเวลาเข้า");
        return;
    }

    const dateElement = document.getElementById('current-date');
    const rawDate = dateElement.dataset.rawDate || new Date().toISOString().split('T')[0];
    const userName = document.getElementById('curren-name').innerText;

    const bookingData = {
        id: Date.now(), 
        roomId: document.getElementById('room_data').innerText,
        roomName: tempRoomName, 
        floor: document.getElementById('floor_data').innerText,
        capacity: document.getElementById('store_data').innerText,
        user: userName,
        purpose: objectiveEl.value || "ไม่ได้ระบุ",
        date: rawDate,                 
        dateText: dateElement.innerText, 
        timeIn: timeInText,
        timeOut: timeOutText,
        status: "pending", // รอตรวจสอบ
        timestamp: Date.now()
    };

    let bookings = JSON.parse(localStorage.getItem('libra_bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('libra_bookings', JSON.stringify(bookings)); 

    alert("ส่งคำขอจองห้องเรียบร้อย! กรุณารอแอดมินตรวจสอบและยืนยัน");
    
    if(window.location.pathname.includes('home_page_admin')) {
         closeModel(); 
    } else {
         window.location.href = '../history/history_room.html'; 
    }
}

function cancelBooking(id) {
    if(confirm('คุณต้องการยกเลิกการจองนี้ใช่หรือไม่?')) {
        let bookings = JSON.parse(localStorage.getItem('libra_bookings')) || [];
        const index = bookings.findIndex(b => b.id === id);
        
        if (index !== -1) {
            bookings[index].status = "cancelled"; 
            localStorage.setItem('libra_bookings', JSON.stringify(bookings));
            alert("ทำการยกเลิกสำเร็จ ข้อมูลถูกย้ายไปที่หน้า 'ยกเลิก' แล้ว");
            location.reload();
        }
    }
}