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
                  <div className="cont-left-bl">
                      <Link to="monuments/1"><h4>Памятники и пейзажи</h4></Link>
                      <img src="../../media/dvoin.jpg" height="100px" />
                      <img src="../../media/odinarn.jpg" height="100px" />
                      <img src="../../media/peizag.jpg" height="100px" />
                      <p>Несмотря на высокие цены, современные технологии добычи и обработки гранита делают памятники из него всё более доступными.<br/>
                          Появляется всё больше памятников умеренной стоимости для широкого круга покупателей.</p>
                      <p>Мы предлагаем услуги по созданию гранитных памятников любой сложности.<br/>
                          Наши мастера - специлисты высокого уровня, работают с полной отдачей своему делу и за вполне доступную цену.<br/>
                          У нас вы можете заказать памятник из таких материалов как гранит и мрамор, как по готовому эскизу, которые можно увидеть на нашем сайте,<br/>
                          так и по собственному. Все детали прорабатываются и прорисовываются, после чего оговаривается цена.</p>
                  </div>

                  <div className="center-bl">
                      <Link to="komplex"><h4>Мраморные и гранитные компексы</h4></Link>
                      <img src="../../media/gran-komp.jpg" height="100px" />
                      <img src="../../media/mram-komp.jpg" height="100px" />
                      <p>Комплексные памятники подразумевают под собой комплексную работу над памятником и прилежащими рядом деталями
                          такими как: лавочки, вазы, надгробие, ограда.</p>
                      <p> Комплекс может быть как мраморным со вставками гранита, так и наоборот.
                          Каждый комплекс индивидуален и по этому выгодно выделяется на фоне остальных работ.</p>
                  </div>

                  <div className="right-block">
                      <Link to="izdel"><h4>Изделия из гранита и мрамора</h4></Link>
                      <img src="../../media/balas.jpg" height="100px" />
                      <img src="../../media/bolls.jpg" height="100px" />
                      <img src="../../media/stairs.jpg" height="100px" />
                      <p>Так же у нас вы можете заказать гранитные и мраморные изделия, такие как:</p>
                      <ul>
                          <a href="#"><li>Балясины</li></a>
                          <a href="#"><li>Вазы</li></a>
                          <a href="#"><li>Шары</li></a>
                          <a href="#"><li>Облицовочная плитка</li></a>
                          <a href="#"><li>Столешницы</li></a>
                          <a href="#"><li>Скамейки</li></a>
                          <a href="#"><li>Камины</li></a>
                          <a href="#"><li>Кухонные вставки</li></a>
                          <a href="#"><li>Ступеньки</li></a>
                      </ul>
                  </div>
              </div>
          </div>
        )
    }
}

export default HomePage;