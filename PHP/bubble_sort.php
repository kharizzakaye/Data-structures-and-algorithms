
<?php
    function bubbleSort($lists)
    {
        $length = count($lists); // calculate the length of the array to sort

        for ($parent = 0; $parent < $length; $parent++) 
        {
            // A for loop that runs through the array elements, comparing each element to the one next to it.
            // length - $parent - 1 => checks that after each pass, the largest element is in its correct position, so the loop does not check the last sorted elements again.
            for ($child = 0; $child < $length - $parent - 1; $child++) 
            {
                // This condition checks if the current element ($lists[$child]) is greater than the next element ($lists[$child + 1])
                if ($lists[$child] > $lists[$child + 1]) 
                {
                    // If the above condition is true, it will swap their positions using a temporary variable $temp to hold the value during the swap.
                    
                    // this is the line of code that has error
                    // This incorrectly sets both $lists[$child] and $lists[$child + 1] to the same value before the swap can complete. 
                    // This error causes incorrect swapping of the elements.
                    $temp = $lists[$child];  // original code => $lists[$child + 1];
                    
                    $lists[$child] = $lists[$child + 1];
                    $lists[$child + 1] = $temp;
                }
            }
        }
        return $lists; // Return the sorted array
    }

    
    $unsortedList = [9, 3, 4, 6, 7, 8, 12, 1];
    $sortedList = bubbleSort($unsortedList);

    echo "Unsorted list: " . implode(', ', $unsortedList);
    echo "<br>" . "Sorted list: " . implode(', ', $sortedList) ;
?>