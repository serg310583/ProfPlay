import s from './EventsUser.module.scss';

export function EventsUser() {
  const events = [
    {
      link: 'https://www.muiv.ru/abitur/dod/#form-dod',
      image: '/assets/images/events/event1.png',
    },
    {
      link: 'https://www.muiv.ru/abitur/dod/#form-dod',
      image: '/assets/images/events/event2.png',
    },
    {
      link: 'https://www.muiv.ru/abitur/dod/#form-dod',
      image: '/assets/images/events/event3.png',
    },
    {
      link: 'https://live.skillfactory.ru/qam_master_class_autumn?_ga=2.73750033.2076350999.1690653443-215108554.1686124528',
      image: '/assets/images/events/event4.png',
    },
    {
      link: 'https://live.skillfactory.ru/data_intensive?_ga=2.73331344.2076350999.1690653443-215108554.1686124528',
      image: '/assets/images/events/event5.png',
    },
  ];
  return (
    <div className={s.wrapper}>
      <h2 className={s.eventTitle}>Дни открытых дверей</h2>

      <ul className={s.list}>
        {events.map((event) => (
          <li key={event.image} className={s.card}>
            <a href={`${event.link}`} target='blank' className={s.link}>
              <img
                src={`${event.image}`}
                alt='event image'
                className={s.imageCard}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
