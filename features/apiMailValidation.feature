Feature: API Mail Validation in Mobile App


  Scenario: Send mail via API and validate in mobile app
    Given I send an email using API with "<username>" and "<password>"
    When I check the email in mobile app
    Then I should see the email content
    Examples:
      | username                                      | password   |
      | testqadbiz1@dbizs-ub22-1912-101.zimbraeng.com | Testqa123@ |