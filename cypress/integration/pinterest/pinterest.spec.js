
import { holydayPage, clickPinPage, closeSignupPage, PAGES, ELEMENTS }from '../utils';
describe('Testing pinterest page flow', ()=> {
    beforeEach(() => {
        cy.visit('https://www.pinterest.com/pinterest/')
      })

    it('Should verify text ', () => {
           cy.get(`${PAGES.HOME.SELECTOR.MAIN_USER_DESCRIPTION_TEXT} ${ELEMENTS.SPAN}`)
           .first()
           .should('have.text', `${PAGES.HOME.EXPECT.TITLE}`)

           cy.get(`${PAGES.HOME.SELECTOR.PROFILE_ABOUT_TEXT} ${ELEMENTS.SPAN}`)
           .first().should('have.text',PAGES.HOME.EXPECT.ABOUT )
    })

    it('Should click share button and facebook link should be empty', () => {

        cy.get(PAGES.HOME.SELECTOR.SHARE_BUTTON).click().and('be.visible')
        cy.get(`${PAGES.HOME.SELECTOR.FACEBOOK_SHARE_ICON} > .gjz > .tBJ`).contains(PAGES.HOME.EXPECT.ICON_TEXT)
        cy.get(`${PAGES.HOME.SELECTOR.FACEBOOK_SHARE_ICON} > .gjz > .Jea`)
        .invoke('attr', 'href')
        .then((link)=> {
            expect(link).to.not.exist
        })

      })


    it('Should exist card holyday 2021 ', () => {
        holydayPage();
        cy.get(`${PAGES.CATEGORY.SELECTOR.SUGGESTED_INTERESTS} ${ELEMENTS.H2}`).should("have.text", "Similar ideas popular now");

    })

    it("Toggle stop requests to login", () => { 

        cy.get(PAGES.HEADER.SELECTOR.SETTING_BUTTON).click().and("be.visible")

         cy.get(PAGES.HEADER.SELECTOR.STOP_LOGIN_REQUEST).click().should(()=> {
            expect(localStorage.getItem("uoiou")).to.eq('true')
         })

         cy.get(PAGES.HEADER.SELECTOR.STOP_LOGIN_REQUEST).click().should(()=> {
            expect(localStorage.getItem("uoiou")).to.eq('false')
         })

    })

    it('Should validate prev arrow is hidden', () => {

        holydayPage()
        clickPinPage()
        .then(()=>{
            closeSignupPage();   
            cy.get(PAGES.PIN.SELECTOR.STORY_PIN_CLOSEUP_PREVIOUS).should('not.be.visible')
       })

    })

    it('Should validate prev arrow is show when click on next arrow', () => {
        holydayPage();
        clickPinPage()
        .then(()=> {
            cy.get(`${PAGES.PIN.SELECTOR.STORY_PIN_CLOSEUP_NEXT}>${ELEMENTS.BUTTON}`)
            .click({force: true})
            closeSignupPage();
            cy.get(PAGES.PIN.SELECTOR.STORY_PIN_CLOSEUP_PREVIOUS).should('be.visible')
        })
    })

    it('Should validate next arrow is hidden when last item', () => {

        const clickHandler = () => {
            return cy.get(`${PAGES.PIN.SELECTOR.STORY_PIN_CLOSEUP_NEXT}>${ELEMENTS.BUTTON}`)
            .click({force: true})
            .then(($el)=> {
            if( $el.is(':visible')) {
                clickHandler();
            }
            })
        }

        holydayPage();
        clickPinPage()
        .then(()=> {
            closeSignupPage();
            clickHandler().then(()=> {
                console.log('to aqui no fim')
                cy.get(`${PAGES.PIN.SELECTOR.STORY_PIN_CLOSEUP_NEXT}>${ELEMENTS.BUTTON}`).should('not.be.visible')
            }) 
    
           
        })
    })

    it('Should click on choose board and try login', ()=> {
        holydayPage();
        clickPinPage()
        .then(()=> {
            closeSignupPage();
            cy.get(`${PAGES.SIGNUP.SELECTOR.CHOOSE_BOARD}`).click()
            cy.get(`${PAGES.SIGNUP.SELECTOR.REGISTER_FORM} ${PAGES.SIGNUP.SELECTOR.EMAIL}`).type("myemail@pinterest.com")
            cy.get(`${PAGES.SIGNUP.SELECTOR.REGISTER_FORM} ${PAGES.SIGNUP.SELECTOR.PASSWORD}`).type("secretpassword")
            cy.get(`${PAGES.SIGNUP.SELECTOR.REGISTER_FORM_SUBMIT_BUTTON}`).click()
            cy.get(`${PAGES.SIGNUP.SELECTOR.REGISTER_FORM} ${PAGES.SIGNUP.SELECTOR.EMAIL_ERROR}`).should('be.visible')
        })
    })
})