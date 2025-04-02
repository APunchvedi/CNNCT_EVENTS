export const participants = [
    { id: '1', name: 'Akbar Husain', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Aneesh Menon', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
    { id: '3', name: 'Rahul Saini', avatar: 'https://randomuser.me/api/portraits/men/68.jpg' },
    { id: '4', name: 'Bharat Thakur', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { id: '5', name: 'Natalia', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: '6', name: 'Alia Toy', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];
  
  export const upcomingMeetings = [
    {
      id: '1',
      title: 'Appointment',
      date: 'Friday, 28 Feb',
      startTime: '2:35 pm',
      endTime: '3:00 pm',
      subtitle: 'You and Dr.kumar',
      status: 'Rejected',
      participants: participants.slice(0, 2),
    },
    {
      id: '2',
      title: 'Meeting-2',
      date: 'Friday, 28 Feb',
      startTime: '1:30 pm',
      endTime: '2:30 pm',
      subtitle: 'You and team 2',
      status: 'Accepted',
      participants: participants.slice(0, 3),
    },
    {
      id: '3',
      title: 'Meeting',
      date: 'Friday, 28 Feb',
      startTime: '10:30 am',
      endTime: '12:30 pm',
      subtitle: 'You and team 1',
      participants: participants,
    },
  ];
  
  export const pendingMeetings = [
    {
      id: '4',
      title: 'Weekly Review',
      date: 'Friday, 28 Feb',
      startTime: '11:00 am',
      endTime: '12:00 pm',
      subtitle: 'You and team 3',
      participants: participants.slice(2, 5),
    },
  ];
  
  export const canceledMeetings = [
    {
      id: '5',
      title: 'Product Demo',
      date: 'Friday, 28 Feb',
      startTime: '3:30 pm',
      endTime: '4:30 pm',
      subtitle: 'You and clients',
      status: 'Rejected',
      participants: participants.slice(1, 4),
    },
  ];
  
  export const pastMeetings = [
    {
      id: '6',
      title: 'Planning Session',
      date: 'Friday, 21 Feb',
      startTime: '9:00 am',
      endTime: '10:00 am',
      subtitle: 'You and team 1',
      status: 'Accepted',
      participants: participants.slice(0, 4),
    },
  ];
  