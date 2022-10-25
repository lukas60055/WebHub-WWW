'use strict';

import '../../node_modules/core-js/modules/es.array.iterator';
import { notification } from './scripts.js';

class Form {
    createField(array) {
        for(let i = 1; i < array.length; i++) {
            let markup = array[i][0];
            let value = array[i][1];
            let way = array[i][2];
            let text = array[i][3];
            $(`.${way}`).append(this.createElement(markup, value));
            if(text !== undefined) {
                this.createText(markup, value, text);
            };
        };
    };

    createText(name, prop, Objtext) {
        let attribute = Object.keys(prop)[0];
        let attrName = Object.keys(prop).map(function(e) {
            return prop[e];
        });

        let number = Object.keys(Objtext);
        let text = Object.keys(Objtext).map(function(event) {
            return Objtext[event];
        });

        if(attribute === 'class') {
            $(`.${attrName[0].toString().split(" ")[0]}:eq(${number})`).text(text.toString());
        } else {
            $(`${name}[${attribute}="${attrName[0].toString().split(" ")[0]}"]`).text(text.toString());
        };
    };

    createElement(elementName, attributes) {
        this.element = this.createElement.call(document, elementName);

        if(attributes && !(attributes instanceof Object)) {
            throw Error('Error attributes - createElement');
        } else if(attributes) {
            for(const attr of Object.keys(attributes)) {
                this.element.setAttribute(attr, attributes[attr]);
            };
        };
        return this.element;
    };

    showContentFirst() {
        $('.form__content--first').css("display", "").animate({
            opacity: 1
        }, 400);
        resizeForm('true', 'first');
    };

    hideContentFirst() {
        $('.form__content--first').animate({
            opacity: 0
        }, 400, function() {
            $(this).css({
                display: "none"
            });
            $('.form__content--second').css({
                display: "block"
            }).animate({
                opacity: 1,
            }, 400);
            resizeForm('true', 'second');
        });
    };

    pagesForm(eq, dir) {
        if(dir === 'next') {
            $(`.form__field:eq(${eq-1})`).removeClass('active-form').animate({
                opacity: 0
            }, 500);
            $(`.form__field:eq(${eq})`).addClass('active-form').animate({
                opacity: 1
            }, 500);
        } else if(dir === 'prev') {
            $(`.form__field:eq(${eq+1})`).removeClass('active-form').animate({
                opacity: 0
            }, 500);
            $(`.form__field:eq(${eq})`).addClass('active-form').animate({
                opacity: 1
            }, 500);
        };
        resizeForm('true', 'second');
    };

    startForm(array) {
        $('.form__container').append('<div class="form__content--second"></div>');
        this.createField(array);
        this.hideContentFirst();
        $('.form__title--h3').text('Wypełnij formularz');
        setTimeout(function() {
            new Form().pagesForm(0, 'next');
        }, 450);

        $('html, body').animate({
            scrollTop: $('.form__content--second').offset().top + 10
        }, 1000);

        // counter subpages
        $('.form__field--range-counter:eq(0)').text($('input[name="subpageForm"]').val());
        $('input[name="subpageForm"]').on("input change", function() {
            $('.form__field--range-counter:eq(0)').text($(this).val());
        });

        // counter budget
        $('.pln').text($('input[name="budgetForm"]').val());
        $('input[name="budgetForm"]').on("input change", function() {
            $('.pln').text($(this).val());
        });

        // input linkpage
        $('#add').on("click", function() {
            $('.form__field--pages-box:eq(0)').append('<input type="text" name="linkpageForm[]" class="form__field--pages-input" placeholder=" " autocomplete="off">')
            $('.form__field--pages-btn:eq(1)').css({opacity: 1});
        });

        $('#del').on("click", function() {
            if($('.form__field--pages-input').length > 1) {
                $('.form__field--pages-input:last-of-type').remove();
                if($('.form__field--pages-input').length <= 1) {
                    $('.form__field--pages-btn:eq(1)').css({opacity: .5});
                };
            };
        });

        // budget
        $('label[for="budget"]').on("click", function() {
            if($('input[name="budgetForm"]').attr('disabled')) {
                $('input[name="budgetForm"]').removeAttr('disabled');
            } else {
                $('input[name="budgetForm"]').prop("disabled", true);
            };
        });

        // buttons
        let page = 0;
        let lift = 0;
        let required = true;

        $('.form__field--button-next').on("click", function() {
            if($(`.form__field:eq(${page})`).hasClass('active-form')) {
                lift = 0;
                let array = $(`.form__field:eq(${page}) [required]`);
                $(array).each(function(i, e) {
                    if (e.value !== '' && required !== false) {
                        required = false;
                    } else if(e.value === '') {
                        required = true;
                        return false;
                    };
                });
                if(!required && $('.form__field').length > page + 1) {
                    page += 1;
                    new Form().pagesForm(page, 'next');
                };
                $(array).each(function(i, e) {
                    if(e.value === '' && e.style.borderColor != "red") {
                        $(e).css({
                            borderColor: "red"
                        }).parent().prepend('<div class="info">Wypełnij to pole!</div>');
                    }
                    if($(e).is('textarea')) {
                        $(e).parent().find('.info').css({
                            top: "18%"
                        });
                    };
                    if(lift === 0 && e.style.borderColor == "red") {
                        $('html, body').animate({
                            scrollTop: $(e).offset().top - 200
                        }, 1000);
                        lift = 1;
                    } else if (lift === 0) {
                        $('html, body').animate({
                            scrollTop: $(e).eq(0).offset().top + 100
                        }, 1000);
                        lift = 1;
                    };
                    $(e).on("click keydown", function() {
                        if(e.style.borderColor == "red") {
                            $(e).css({
                                borderColor: ""
                            });
                            $(e).parent().find('.info').remove();
                            return;
                        };
                    });
                });
            };
        });

        $('.form__field--button-prev').on("click", function() {
            page -= 1;
            required = false;
            if(page <= -1) {
                $('.form__content--second').animate({
                    opacity: 0
                }, 300, function() {
                    $(this).remove();
                    new Form().showContentFirst();
                    $('.form__title--h3').text('Wybierz usługę');
                });
            } else {
                new Form().pagesForm(page, 'prev');
            };
        });

        // refresh svh -- bug
        setTimeout(function() {
            const container = $('.form__field--checkbox-svg');
            const content = container.parent().html();
            $(container).parent().html(content);
        }, 500);

        // contact form
        $('.valuation').submit(function(event) {
            event.preventDefault();
            $.ajax({
                type: $('.valuation').attr('method'),
                url: $('.valuation').attr('action'),
                dataType: 'html',
                data: {
                    data: $('.valuation').serialize(),
                    type: $('.form__field--type').eq(0).text()
                },
                success: function() {
                    $('button[type="submit"]').prop("disabled", true);
                    if($('.valuation-success').length === 0) {
                        $('.form__field').animate({
                            opacity: 0
                        }, 750, function() {
                            $('.valuation').remove();
                            $('.valuation-success').css({
                                display: "block"
                            });
                        });
                        $.getJSON(`./js/JSON/success.json`, function(array) {
                            new Form().createField(array);
                        });
                        $('.form__title--h3').text('Wysłano formularz');
                    };
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    notification('error');
                    console.log('Wyślij błędy na: kontakt@web-hub.pl');
                    console.log(`Błędy: ${textStatus}`);
                    console.log(errorThrown);
                }
            });
        });
    };
};

$(function() {
    $('.form__box').each((i, element) => {
        $(element).on("click", async () => {
            if($('.form__content--second').length === 0) {
                await $.getJSON(`./js/JSON/form${i}.json`, function(array) {
                    new Form().startForm(array);
                });
            };
        });
    });

    if(localStorage.getItem('form')) {
        const value = localStorage.getItem('form');
        $.getJSON(`./js/JSON/form${value}.json`, function(array) {
            new Form().startForm(array);
        });
        localStorage.removeItem('form');
    };

    // height form container
    resizeForm('false', 'first');

    $(window).resize(function() {
        resizeForm('true', 'first');
    });

    $(window).resize(function() {
        if($('.form__content--second').length !== 0) {
            resizeForm('true', 'second');
        }
    });
});

function resizeForm(resize, who) {
    let windowH = $(window).height();
    let headerH = $('header').height();
    let footerH = $('footer').height();
    let formContentH = $(`.form__content--${who}`).height();
    let formTitleH = $('.form__title').height();

    let content = formContentH + formTitleH + footerH + 180;
    let sum = windowH - headerH - footerH;

    if(resize === 'true') {
        if(windowH > content) {
            $('.form__container').css({height: sum});
        } else {
            $('.form__container').css({height: "auto"});
        };
    } else if(resize === 'false' && windowH > content) {
        $('.form__container').css({height: sum});
    };
};