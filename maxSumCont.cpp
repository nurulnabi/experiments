// C++ program to print largest contiguous array sum
#include<iostream>
#include<climits>
using namespace std;
 
int maxSubArraySum(int a[], int size)
{
    int max = INT_MIN, maxTmp = 0;
 
    for (int i = 0; i < size; i++)
    {
        maxTmp = maxTmp + a[i];
        cout<<maxTmp<<" = "<<max<<endl;
        if (max < maxTmp)
            max = maxTmp;
 
        if (maxTmp < 0)
            maxTmp = 0;
    }
    return max;
}
 
/*Driver program to test maxSubArraySum*/
int main()
{
    int a[] = {1,-2,-3,-4,5,-3,4,5,6};
    int n = sizeof(a)/sizeof(a[0]);
    int max_sum = maxSubArraySum(a, n);
    cout << "Maximum contiguous sum is " << max_sum;
    return 0;
}