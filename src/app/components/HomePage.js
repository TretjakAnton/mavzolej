import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    render() {
        return (
          <div className="content">
            <div className="wrap">
                Во все времена надгробные сооружения – памятники, склепы, обелиски, мавзолеи и надгробия, были данью уважения и памяти усопшим родным и близким людям. 
                Памятники  – это запечатлённая в камне память об ушедших, наглядное свидетельство уважения и любви их близких, символы скорби и печали.
                Гранит является одной из самых плотных, твёрдых и прочных пород. Кроме того, гранит имеет низкое водопоглощение и высокую устойчивость к морозу и загрязнениям. Гранит -  долговечный, износоустойчивый, прочный, стойкий к перепадам температур и влажности материал.
                Вот почему гранитные памятники практически неподвластны времени, не тускнеют и не боятся тяжелых  погодных условий.
                <br/>
                <h2>О   НАС</h2>  

                <div>Наша фирма занимается изготовлением памятников, надгробий, обелисков, цветников, цоколя из натурального природного гранита.
                    Мы предлагаем большой выбор стандартных и элитных памятников; изготовление мемориальных комплексов.
                        Гравировка портрета и оформление памятника производится вручную профессиональными художниками. 
                    Установка памятников производится на любом кладбище в  г.Харькове и Харьковской области.
                        Срок изготовления памятника около двух недель.
                    Наш опыт работы позволит дать Вам нужную информацию и провести консультацию по всем вопросам, касающихся нашей продукции: свойствах гранита, вариантах изготовления,  установки.
                    Мы работаем без услуг посредников, самостоятельно закупаем материал для изготовления памятников на украинских карьерах, что позволяет снижать их себестоимость, делая цены доступными.
                </div>

                <h2>Спасибо за проявленный интерес к нашему сайту.</h2> 
                <Link to="/aboutUs">Наши контакты и карта проезда</Link>
            </div>
          </div>
        )
    }
}

export default HomePage;