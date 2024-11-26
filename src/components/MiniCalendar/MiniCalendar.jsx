import React, { useState } from 'react';

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // 获取当月的天数
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 获取月份第一天是星期几
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 获取上个月的天数
  const getDaysInPrevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };

  // 处理月份切换
  const handleMonthChange = (increment) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + increment)));
  };

  // 处理日期选择
  const handleDateSelect = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(selected);
    }
  };

  // 生成日历数据
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = getDaysInPrevMonth(currentDate);
    const today = new Date();
    
    const days = [];

    // 添加上个月的日期
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // 添加当前月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: 
          today.getDate() === i && 
          today.getMonth() === currentDate.getMonth() && 
          today.getFullYear() === currentDate.getFullYear()
      });
    }

    // 添加下个月的日期
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg 
                    transition-all duration-300 hover:-translate-y-1 
                    border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => handleMonthChange(-1)}
          className="px-4 py-2 text-white bg-blue-500/80 rounded-xl 
                     hover:bg-blue-600/90 transition-all duration-300 
                     hover:scale-105 backdrop-blur-sm"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
        </h2>
        <button 
          onClick={() => handleMonthChange(1)}
          className="px-4 py-2 text-white bg-blue-500/80 rounded-xl 
                     hover:bg-blue-600/90 transition-all duration-300 
                     hover:scale-105 backdrop-blur-sm"
        >
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className="p-3 text-center font-semibold text-gray-700 
                       bg-gray-100/70 rounded-lg"
          >
            {day}
          </div>
        ))}
        
        {generateCalendarDays().map((item, index) => (
          <div
            key={index}
            onClick={() => handleDateSelect(item.day, item.isCurrentMonth)}
            className={`
              p-3 text-center rounded-lg cursor-pointer
              transition-all duration-200 hover:scale-110 hover:z-10
              animate-fade-in
              ${!item.isCurrentMonth ? 'text-gray-400 opacity-60' : 'text-gray-700'}
              ${item.isToday ? 'ring-2 ring-blue-400 font-bold' : ''}
              ${selectedDate && selectedDate.getDate() === item.day && 
                selectedDate.getMonth() === currentDate.getMonth()
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                : 'hover:bg-gray-100/80'}
            `}
          >
            {item.day}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 text-center text-gray-700 bg-gray-100/70 
                      rounded-xl backdrop-blur-sm transition-all duration-300">
          当前选择的日期是：{selectedDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default MiniCalendar; 