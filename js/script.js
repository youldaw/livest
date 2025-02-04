$(function () {

    // $('input[name=phone]').mask('+7 (999) 999-99-99');

    $('.menu-opener').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.navbar').toggleClass('active');
    });


    // help form check message
    if ($('.check-message input').prop('checked')) {
        $('form-message').show();
    } else {
        $('.form-message').hide();
    }
    $('.check-message input').change(function () {
        if ($(this).prop('checked')) {
            $('.form-message').show();
        } else {
            $('.form-message').hide();
        }
    });


    var swiper1 = new Swiper(".main-slide", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        speed: 1000,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    var swiper2 = new Swiper(".mn-slide", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });


    var swiper3 = new Swiper(".partner-slide", {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });



    var swiper4 = new Swiper(".sert-slide", {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: ".sert-button-next",
            prevEl: ".sert-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });


    var swiper5 = new Swiper(".tcm-slide", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });



    $('select').each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
            if ($this.children('option').eq(i).is(':selected')) {
                $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
            }
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.find('li.is-selected').removeClass('is-selected');
            $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });


    // wizard diagnostics
    $(function () {
        let currentStep = 0;
        const steps = $('.step');
        const progressBar = $('.progress-fill');
        const progressText = $('.progress-text');
        const nextBtn = $('#next-btn');

        function updateProgress() {
            const progress = ((currentStep) / (steps.length - 1)) * 100;
            progressBar.css('width', progress + '%');
            progressText.text(Math.round(progress) + '%');
        }

        function showStep(index) {
            steps.removeClass('active');
            steps.eq(index).addClass('active');
            nextBtn.addClass('disabled');

            if (index === steps.length - 1) {
                nextBtn.attr('href', 'diagnostics-result.html').html('Далее <img src="images/btn-arrow.png" alt="">');
            } else {
                nextBtn.removeAttr('href').html('Далее <img src="images/btn-arrow.png" alt="">');
            }
        }

        function enableNextButton() {
            nextBtn.removeClass('disabled');
        }

        $('input[type="radio"]').on('change', function () {
            enableNextButton();
        });

        nextBtn.click(function (e) {
            if (currentStep < steps.length - 1) {
                e.preventDefault();
                currentStep++;
                showStep(currentStep);
                updateProgress();
            }
        });

        showStep(currentStep);
        updateProgress();
    });


    // about video
    var $videoWrapper = $('.video-wrapper');
    var $video = $videoWrapper.find('video').first();

    if ($video.length) {
        renderVideoPlayButton();
    }

    function renderVideoPlayButton() {
        formatVideoPlayButton();
        $video.addClass('has-media-controls-hidden');

        var $videoPlayButton = $('.video-overlay-play-button');
        $videoPlayButton.on('click', hideVideoPlayButton);
    }

    function formatVideoPlayButton() {
        $videoWrapper.append(
            '<svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">' +
            '<polygon points="70, 55 70, 145 145, 100" fill="#fff"/>' +
            '</svg>'
        );
    }

    function hideVideoPlayButton() {
        $video[0].play();
        $('.video-overlay-play-button').addClass('is-hidden');
        $video.removeClass('has-media-controls-hidden').attr('controls', 'controls');
    }

});



