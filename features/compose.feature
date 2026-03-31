Feature: Compose and Send Email

  Scenario Outline: User A composes and sends an email to User B

   Given I compose an email to "<recipient>" with subject "<subject>" and body "<body>"
    When I navigate to Sent folder
    Then I should see the sent email with subject "<subject>"
    Then  I should see the "<recipientUsername>" in sent mail details

    Examples:
      | recipient                                     | subject       | body            | recipientUsername |
      | testqadbiz2@dbizs-ub22-1912-101.zimbraeng.com | AUTO_GENERATE | Hello from WDIO | testqadbiz2       |