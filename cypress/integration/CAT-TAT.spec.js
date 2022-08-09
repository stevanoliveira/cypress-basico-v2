/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {       
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Test, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Stevan')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('stevan.oliveira@valtech.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }) 
        cy.get('button[type="submit"]').click()
        
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Stevan')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('stevan.oliveira@valtech,com')
        cy.get('#open-text-area').type('Test') 
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe a mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Stevan')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('stevan.oliveira@valtech.com')
        cy.get('#phone-checkbox').check() // tornará o telefone obrigatório
        cy.get('#open-text-area').type('Test') 
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Stevan')
            .should('have.value', 'Stevan')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Oliveira')
            .should('have.value', 'Oliveira')
            .clear()
            .should('have.value', '') 
        cy.get('#email')
            .type('stevan.oliveira@valtech.com')
            .should('have.value', 'stevan.oliveira@valtech.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11987769401')
            .should('have.value', '11987769401')
            .clear()
            .should('have.value', '')
    })

    it('exibe a mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marca um tipo de atendimento (feedback)', function() { 
        cy.get('input[type="radio"][value="feedback"')
          .check('feedback')
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) { 
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
        
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
          .check() //vai marcar todos os checkboxes encontrado no seletor
          .should('be.checked')
          .last() //comando seleciona o útimo checkbox
          .uncheck() //desmarca somente o último
          .should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload') // podemos misturar seletores CSS
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')  
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload') // podemos misturar seletores CSS
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })  
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
   it('seleciona um arquivo utiliando um fixture a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
   })
   it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
   })

   it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target') 
          .click()  

        cy.contains('Talking About Testing')
          .should('be.visible')  
   })


})