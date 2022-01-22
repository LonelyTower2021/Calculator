User clicks on number button
    Append the number
    Display all stored numbers
    Repeat until an operator button is clicked

User clicks on a non-number button
    If the button is Clear
        Wipe all stored values
        Clear the display
    If the button is Backspace
        If there are no values stored, do nothing
        If there are values stored, pop the most recent value
    If the button is Dot
        Append value
        Display value
    If operator clicked is a math operator
        If the operator is an equals, then
            Operate on the earliest three values
            Store the resulting number from the operation
            Display the resulting number
        If the operator is a +-*/ then
            Operate on the earliest three values
            Store the resulting number from the operation
            Store the new operator
            Display the resulting number with the new operator

----------------------------------------------------------------

User clicks on Integer Button
    Click event fired for Button
    Get Integer of button from event
    Store value into User Input container
    Update display with User Input container values

User clicks on Math Operator Button
    Click event fired for Button
    Get operator value of button from event
    If operator is Equals Operator
        Is User Input < 3?
            Throw error / return
    If Operator flag is False
        Store math operator into User Input container
        Update display with User Input container values
    If the top value is a Integer and the Operator flag is True
        Iterate through User Input container
            If value is numeric and not last value in User Input container
                Append to running total
            Else If value is operator
                Store total to variableA
                Store operator to variableO
                Reset Total to 0
            Else end of User Input container encountered
                Store total to variableB
        Operate on variableA, variableB, variableO to create Result
        Clear stored User Input container values
        Split Result into individiaul Integers
        Store Integers into User Input container
        If Operator is not equals
            Store math operator into User Input container
        Update display with User Input container values
    If the top value is an Math Operator
        Append operator to User Input Container
        Throw error message onto display
        Update display with User Input Container values

What should happen when the User clicks a math operator a second time?
    OS Calculator:  Append operator
    Assignment: Should immediately throw an error

What should happen when the User clicks multiple math operators?
    Error should appear/remain for each new operator
    Backspace or clear should clear error message
    Successfully completing a math operation should also clear error message


[-][N][.][N][/*+-][-][N][.][N]

if operator is minus, and it's either the first value or the value immediately after an operator, add a minus to user input
