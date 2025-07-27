"use client";
import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users, BookOpen, Trophy, Music, Palette, Camera } from 'lucide-react';
import { AnimatedCard, ScrollReveal, AnimatedText, FloatingElements } from '@/components/animated';
import { motion, AnimatePresence } from 'framer-motion';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const eventTypes = {
  academic: { color: '#4A7C59', icon: BookOpen },
  sports: { color: '#9CAF88', icon: Trophy },
  cultural: { color: '#F8BBD9', icon: Music },
  arts: { color: '#F4A460', icon: Palette },
  exam: { color: '#8B7355', icon: BookOpen },
  holiday: { color: '#7BA05B', icon: Calendar },
};

const academicEvents = [
  {
    id: 1,
    title: "New Academic Year Begins",
    date: "2024-04-01",
    type: "academic",
    time: "8:00 AM",
    location: "School Campus",
    description: "Welcome ceremony for new academic year 2024-25"
  },
  {
    id: 2,
    title: "Annual Sports Day",
    date: "2024-03-15",
    type: "sports",
    time: "9:00 AM",
    location: "Sports Ground",
    description: "Inter-house sports competition and athletic events"
  },
  {
    id: 3,
    title: "Science Exhibition",
    date: "2024-02-10",
    type: "academic",
    time: "10:00 AM",
    location: "Science Laboratory",
    description: "Student science projects and innovation showcase"
  },
  {
    id: 4,
    title: "Cultural Fest 2024",
    date: "2024-01-20",
    type: "cultural",
    time: "6:00 PM",
    location: "School Auditorium",
    description: "Annual cultural celebration with performances"
  },
  {
    id: 5,
    title: "Art Exhibition",
    date: "2024-05-25",
    type: "arts",
    time: "11:00 AM",
    location: "Art Gallery",
    description: "Student artwork and creative projects display"
  },
  {
    id: 6,
    title: "Mid-Term Examinations",
    date: "2024-06-15",
    type: "exam",
    time: "9:00 AM",
    location: "Examination Halls",
    description: "Mid-term assessments for all grades"
  },
  {
    id: 7,
    title: "Summer Vacation Begins",
    date: "2024-05-01",
    type: "holiday",
    time: "All Day",
    location: "School Campus",
    description: "Summer break starts for all students"
  },
  {
    id: 8,
    title: "Independence Day Celebration",
    date: "2024-08-15",
    type: "cultural",
    time: "8:00 AM",
    location: "School Playground",
    description: "National Independence Day celebrations"
  },
  {
    id: 9,
    title: "Parent-Teacher Meeting",
    date: "2024-07-20",
    type: "academic",
    time: "2:00 PM",
    location: "Classrooms",
    description: "Quarterly parent-teacher interaction session"
  },
  {
    id: 10,
    title: "Annual Day Celebration",
    date: "2024-12-15",
    type: "cultural",
    time: "6:00 PM",
    location: "School Auditorium",
    description: "Grand annual celebration with performances"
  }
];

export default function AcademicCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<typeof academicEvents[0] | null>(null);

  const filteredEvents = academicEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
  });

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = academicEvents.filter(event => event.date === dateStr);
      
      days.push(
        <motion.div
          key={day}
          className={`h-12 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-200 relative ${
            dayEvents.length > 0 
              ? 'bg-nature-accent/20 text-nature-accent hover:bg-nature-accent/30' 
              : 'text-nature-secondary dark:text-nature-secondary hover:bg-nature-card'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {day}
          {dayEvents.length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-nature-accent rounded-full flex items-center justify-center text-xs text-white">
              {dayEvents.length}
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-nature-primary dark:bg-nature-primary pt-20">
      <FloatingElements theme="education" density="low" />
      
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeUp">
            <AnimatedText
              text="Academic Calendar"
              className="text-5xl md:text-7xl font-bold mb-6"
              animation="morphing"
              gradient={true}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-xl md:text-2xl text-nature-secondary dark:text-nature-secondary mb-8 max-w-3xl mx-auto">
              Stay updated with all academic events, examinations, holidays, and special celebrations throughout the year.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendar Controls */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp">
            <div className="flex items-center justify-between mb-8">
              <motion.button
                onClick={prevMonth}
                className="flex items-center gap-2 bg-nature-card hover:bg-nature-secondary text-nature-primary dark:bg-nature-card dark:hover:bg-nature-secondary dark:text-nature-primary px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
                Previous
              </motion.button>
              
              <h2 className="text-3xl md:text-4xl font-bold text-nature-primary dark:text-nature-primary font-japanese">
                {months[selectedMonth]} {selectedYear}
              </h2>
              
              <motion.button
                onClick={nextMonth}
                className="flex items-center gap-2 bg-nature-card hover:bg-nature-secondary text-nature-primary dark:bg-nature-card dark:hover:bg-nature-secondary dark:text-nature-primary px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp">
            <AnimatedCard background="glass" className="p-6 mb-8">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-nature-secondary dark:text-nature-secondary py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </AnimatedCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp">
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-8 text-center">
              Events in {months[selectedMonth]} {selectedYear}
            </h3>
          </ScrollReveal>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => {
                const eventConfig = eventTypes[event.type as keyof typeof eventTypes];
                const EventIcon = eventConfig.icon;
                
                return (
                  <ScrollReveal key={event.id} animation="fadeUp" delay={index * 0.1}>
                    <AnimatedCard
                      background="glass"
                      hoverEffect="lift"
                      className="p-6 cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${eventConfig.color}`}>
                          <EventIcon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-nature-primary dark:text-nature-primary mb-2">
                            {event.title}
                          </h4>
                          
                          <div className="space-y-2 text-nature-secondary dark:text-nature-secondary text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <span>{event.time}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-nature-secondary/70 dark:text-nature-secondary/70 text-sm mt-3">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedCard>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <ScrollReveal animation="fadeUp">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-nature-secondary/50 dark:text-nature-secondary/50 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-nature-secondary dark:text-nature-secondary mb-2">
                  No Events This Month
                </h3>
                <p className="text-nature-secondary/70 dark:text-nature-secondary/70">
                  Check other months for upcoming events and activities.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Event Legend */}
      <section className="section-padding bg-nature-card/30 dark:bg-nature-card/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp">
            <h3 className="text-3xl font-bold text-gradient mb-8 text-center">
              Event Types
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(eventTypes).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <AnimatedCard key={type} background="glass" className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-nature-primary dark:text-nature-primary font-semibold capitalize">
                      {type}
                    </h4>
                  </AnimatedCard>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-nature-card rounded-2xl p-8 max-w-lg w-full m-4 border border-nature-accent/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${eventTypes[selectedEvent.type as keyof typeof eventTypes].color}`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-nature-primary dark:text-nature-primary">
                  {selectedEvent.title}
                </h3>
              </div>
              
              <div className="space-y-4 text-nature-secondary dark:text-nature-secondary">
                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={18} />
                  <span>{selectedEvent.time}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  <span>{selectedEvent.location}</span>
                </div>
                
                <p className="text-nature-secondary/70 dark:text-nature-secondary/70 mt-4">
                  {selectedEvent.description}
                </p>
              </div>
              
              <motion.button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 w-full btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}