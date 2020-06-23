// use foundation
// import Foundation from 'foundation-sites';
// import WhatInput from 'what-input/dist/what-input';

// use bootstrap
// import 'bootstrap/dist/js/bootstrap';
import 'jquery-lazy/jquery.lazy';

const greeting = () => {
    //console.log('first test!');

    $(function() {
        // run foundation
        // $(document).foundation();
        // lazy load
        $('.lazy').Lazy({
            // effect: "fadeIn",
            // effectTime: 800,
            // threshold: 0
        });
    });
};

const IndexedSearchAutocomplete = () => {
    require('./IndexSearch');
};


greeting();
IndexedSearchAutocomplete();