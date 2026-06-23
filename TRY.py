nums = [7, 1, 3, 9, 10, 456, 867, 5]

# 手写选择排序：不使用 sorted() / list.sort()
for i in range(len(nums) - 1):
    min_index = i
    for j in range(i + 1, len(nums)):
        if nums[j] < nums[min_index]:
            min_index = j
    nums[i], nums[min_index] = nums[min_index], nums[i]

print(nums)
