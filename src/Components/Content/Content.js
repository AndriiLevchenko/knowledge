import React from 'react';
import classes from './Content.module.css';



const Content =(props)=> {
    return(
        <div className="posts">
            <div className="post">
              <h2 className="title">Перевір свої знання</h2>
              <h3 className="posted">Проект засновано в жовтні 2020 р.</h3>
              <div className="story">
                <p><em><strong>"Знання" -</strong></em> ресурс, де ти можеш перевірити свої <strong>знання,</strong> проходячи тести на різні теми. 
                Проходячи тести, ти набираєш бали, створюючи свій рейтинг. Рейтинг створюється як з кожного тесту, так і загальний. Ти не можеш
                покращити свій результат  раніше ніж за місяць  від проходження тесту. </p>
                <p><strong>Відважуйся!</strong></p>
              </div>
              <div className="meta">
                <p>Filed under <a href="#" className="category">Uncategorized</a> | <a href="#" className="comment">1 Comment &raquo;</a></p>
              </div>
            </div>
            <div className="post">
              <h2 className="title">А ти знаєш?</h2>
              <h3 className="posted">Posted on January 1st, 2007 by Author</h3>
              <div className="story">
                <blockquote>
                    <ul>
                        <li>
                            <p>Мета навчання - досягти найбільшого задоволення в  отриманні знань</p>
                            <footer>— <cite>Сунь Цзи</cite></footer>
                        </li>
                        <li>
                            <p>Учням, щоб досягти успіху, треба наздоганяти тих, хто попереду, і не чекати тих, хто позаду.</p>
                            <footer>— <cite>Аристотель</cite></footer>
                        </li>
                        <li> 
                            <p>Дисципліни, яким навчають дітей, повинні відповідати їхньому віку, інакше є небезпека, що в них розвинеться мудрування, пихатість, марнославство.</p>
                            <footer>— <cite>Імануіл Кант</cite></footer>
                        </li>
                        <li> 
                            <p>Навчайтеся так, наче ви постійно відчуваєте нестачу своїх знань, і так, наче ви постійно боїтеся розгубити свої знання.</p>
                            <footer>— <cite>Конфуций</cite></footer>
                        </li>
                        <li> 
                            <p>Чому б ти не навчався - ти навчаєшся для себе.</p>
                            <footer>— <cite>Петроній</cite></footer>
                        </li>
                    </ul>
                </blockquote>
               
                <blockquote>
                  <p>«Інтелект - скоріше не мода, а закономірність, адекватну відповідь на виклики часу. щось на зразок природного відбору: виживає геніальний. наше суспільство в цілому стало розумнішим, людей з високим IQ стало більше. З іншого боку, для окремих людей це спосіб соціального маркування і організації в співтовариства. У 1990-і принцип «рибалка рибалку бачить здалеку» не давав осічок: металісти легко впізнавали в натовпі металістів, панки - панків. Сьогодні на зміну цим субкультур прийшли спільноти по інтелектуальному ознакою ».</p>
                </blockquote>
              </div>
              <div className="meta">
                <p>Filed under <a href="#" className="category">Uncategorized</a> | <a href="#" className="comment">1 Comment &raquo;</a></p>
              </div>
            </div>
        </div>
    )
}
    export default Content;