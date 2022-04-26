function loadToolTips() {
    tippy('#classic', {
        content: "Classic",
        animation: 'fade',
    });

    tippy('#technical', {
        content: "Technical",
        animation: 'fade',
    });

    tippy('#french', {
        content: "120mm </br> (Squad Mod France)",
        animation: 'fade',
        interactive: true,
        allowHTML: true,
        onShown(instance) { // Hide 'new' tooltip when user hover french mortars
            const tooltip_new = document.querySelector('#french')._tippy;
            tooltip_new.disable();
        },
    });


    // "NEW !" ToolTip
    tippy('#french', {
        content: "New!",
        animation: 'fade',
        placement: 'bottom',
        allowHTML: true,
        showOnCreate: true,
        theme: 'new',
        onHidden(instance) {
            instance.destroy();
        },
    });

    tippy('#copy', {
        content: "Click to copy",
        placement: 'right',
        animation: 'fade',
        followCursor: true,
        arrow: false,
        offset: [45, -20],
    });

    const tooltip_copy = document.querySelector('#copy')._tippy;
    tooltip_copy.disable();


    tippy('#settings', {
        content: "<i class=\"fa fa-check\"></i> Copied !",
        allowHTML: true,
        placement: "bottom",
        animation: 'fade',
        theme: 'new',
        onShow(instance) {
            setTimeout(() => {
                instance.hide();
                instance.disable();
            }, 1500);

        }
    });
    const tooltip_copied = document.querySelector('#settings')._tippy;
    tooltip_copied.disable();

    tippy('.youtube', {
        content: "Watch my videos!",
        animation: 'fade',
    });

    tippy('.github', {
        content: "View code on GitHub!",
        animation: 'fade',
    });

    tippy('.save i', {
        content: "Save for later",
        placement: 'right',
        animation: 'fade',
        interactiveDebounce: 75,
    });
    const tooltip_save = document.querySelector('.save i')._tippy;

}