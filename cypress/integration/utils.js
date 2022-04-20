export const PAGES = {
    HEADER: {
        SELECTOR: {
           SETTING_BUTTON: '[data-test-id="setting-button"]',
           STOP_LOGIN_REQUEST: '[data-test-id="stop-login-request"]'
        }
    },

    HOME: {
        SELECTOR: {
            MAIN_USER_DESCRIPTION_TEXT: '[data-test-id="main-user-description-text"]',
            PROFILE_ABOUT_TEXT: '[data-test-id="profileAboutText"]',
            SHARE_BUTTON: '[data-test-id="share-button"]',
            FACEBOOK_SHARE_ICON: '[data-test-id="facebook-share-icon"]',
        },
        EXPECT: {
            TITLE: '@pinterest',
            ABOUT: "Waiting to be inspired? Welcome. That's what we're here for. ♥️📌",
            ICON_TEXT: 'Facebook'
        }
    },

    CATEGORY: {
        SELECTOR: {
            SUGGESTED_INTERESTS: '[data-test-id="suggested-interests"]',
            BOARD_CARD_HOLYDAYS: '[data-test-id="boardCard-Holidays 2021"]',
            PINCARD_STORY_PIN: '[data-test-id="pincard-storyPin-without-link"]'
        }
    },

    PIN: {
        SELECTOR: {
            STORY_PIN_CLOSEUP_PREVIOUS: '[data-test-id="story-pin-closeup-previous"]',
            STORY_PIN_CLOSEUP_NEXT: '[data-test-id="story-pin-closeup-next"]'
        }
        
    },

    SIGNUP: {
        SELECTOR: {
           FULL_PAGE_SIGNUP_CLOSE_BUTTON: '[data-test-id="full-page-signup-close-button"]',
           REGISTER_FORM: '[data-test-id="registerForm"]',
           REGISTER_FORM_SUBMIT_BUTTON: '[data-test-id="registerFormSubmitButton"]',
           CHOOSE_BOARD: '[style="pointer-events: auto;"] > .gpV',
           EMAIL: '#email',
           PASSWORD: '#password',
           EMAIL_ERROR: '#email-error'
        }
    }
}

export const ELEMENTS = {
    SPAN: 'span',
    H2: 'h2',
    BUTTON: 'button'
}

export function holydayPage() {
    cy.findByRole("list").children().last().scrollIntoView()
    cy.get(PAGES.CATEGORY.SELECTOR.BOARD_CARD_HOLYDAYS).should("exist")
    cy.get(PAGES.CATEGORY.SELECTOR.BOARD_CARD_HOLYDAYS).click()
}

export function clickPinPage() {
    
   return cy.get(PAGES.CATEGORY.SELECTOR.PINCARD_STORY_PIN)
    .each(($el, index) => {
         let quantityItens = +$el
         .children()
         .first()
         .children()
         .last()
         .text()

         if(quantityItens > 1) {
             return false
         }
    })
    .then(($el)=> {
          return $el.first().click()
    })
}

export function closeSignupPage() {
    cy.get(PAGES.SIGNUP.SELECTOR.FULL_PAGE_SIGNUP_CLOSE_BUTTON).click()
}

