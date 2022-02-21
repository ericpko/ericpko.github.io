# Applying a convolution over a 2D image

Suppose we're given a flattened 1D greyscale image `img_1D` with $n_x$ pixels
wide and $n_y$ pixels high and a flattened 1D filter `filter_1D` with dimensions
$f_n \times f_n$
that we want to apply to the image.

## Solution
We'll first break this problem up into two functions: one will apply the
convolution for a single pixel, and the other function will apply the filter
for ever pixel over the entire image. We'll start by writing the outter function.

```python
def apply_filter2d(img_1D: list, n_x: int, n_y: int, filter_1D: list, f_n: int) -> list:
   filtered_img = []
   # Iterate over each pixel (i, j) of the imaginary 2D image
   for j in range(n_y):
      for i in range(n_x):
         # get the pixel index
         pxl_idx = j * n_x + i
         # apply convolution to pixel (i, j)
         pxl_val = apply2d(img_1D, n_x, n_y, filter_1D, f_n, i, j)

         filtered_img[pxl_idx] = pxl_val

         # update min and max pixel value seen so far if you also want to normalize image
         # ...

   return filtered_img
```

Now we just need to write the code for `apply2d`, which applies the filter to
each pixel.

```python
def apply2d(img_1D: list, n_x: int, n_y: int, filter_1D: list, f_n: int, i: int, j: int) -> float:
   # Get the mid point of the filter dimension:
   f_mid = f_n // 2

   pairwise_product = 0.0
   # Iterate over the rows of the filter:
   for row in range(f_n):
      # Get the row offset for the original image:
      row_offset = f_mid - (f_n - 1) + row         # ranges between (-f_mid, f_mid + 1)
      # Iterate over the columns of the filter:
      for col in range(f_n):
         # Get the column offset for the original image:
         col_offset = f_mid - (f_n - 1) + col

         # Get the new indices of the original image for boundary checking:
         x = i + col_offset
         y = j + row_offset

         # Check if the corresponding indices in the original image are in bound:
         if x >= 0 and x < n_x and y >= 0 and y < n_y:
            # Convert the 2D indices to 1D
            pxl_idx = y * n_x + x
            flt_idx = row * f_n + col

            # Sum the pairwise product:
            pairwise_product += img_1D[pxl_idx] * filter_1D[flt_idx]
   
   return int(pairwise_product)
```
