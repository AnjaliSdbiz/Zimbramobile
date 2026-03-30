Feature: Login Functionality

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    And I enter the server address "<server>"
    When I login with "<username>" and "<password>" And tap on the login button
    Then I should see inbox of the "<username>" account

    Examples:
      | username                                      | password   | message                        | server                            |
      | testqadbiz1@dbizs-ub22-1912-101.zimbraeng.com | Testqa123@ | You logged into a secure area! | dbizs-ub22-1912-101.zimbraeng.com |