Add-Type -AssemblyName System.Drawing

$srcLogo = "C:\Users\Ryad\.gemini\antigravity\brain\4959d110-d035-4665-adaa-4607eeefdb59\.user_uploaded\media_1792702918683_03559618.png"
$srcFavicon = "C:\Users\Ryad\.gemini\antigravity\brain\4959d110-d035-4665-adaa-4607eeefdb59\.user_uploaded\media_1792702922260_70359b5b.png"

$publicDir = "C:\Users\Ryad\Downloads\AFFIL\public"
$appDir = "C:\Users\Ryad\Downloads\AFFIL\app"

# 1. Copy raw sources for permanent reference
Copy-Item -Path $srcLogo -Destination "$publicDir\logo-raw.png" -Force
Copy-Item -Path $srcFavicon -Destination "$publicDir\favicon-raw.png" -Force
Write-Host "Saved raw sources"

# 2. Process Logo
$rawLogoBmp = New-Object System.Drawing.Bitmap($srcLogo)

# Tightly crop the logo around the bounding box (x: 44..981, y: 96..261)
# With 6px padding: x=38, y=90, w=950, h=178
$cropX = 38
$cropY = 90
$cropW = 950
$cropH = 178

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedLogo = $rawLogoBmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save standard logo (dark typography on transparent background)
$croppedLogo.Save("$publicDir\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $publicDir\logo.png ($cropW x $cropH)"

# 3. Create light logo for dark footer (white typography, green mark preserved)
$lightLogo = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $p = $croppedLogo.GetPixel($x, $y)
        if ($p.A -gt 0) {
            # Check if this pixel is part of the green roof/window mark
            $isGreen = ($p.G -gt ($p.R + 25)) -and ($p.G -gt ($p.B + 15)) -and ($p.G -gt 60)
            if ($isGreen) {
                # Keep vibrant green or brighten slightly for dark mode contrast
                $newColor = [System.Drawing.Color]::FromArgb($p.A, [Math]::Min(255, [int]($p.R * 1.1 + 10)), [Math]::Min(255, [int]($p.G * 1.1 + 20)), [Math]::Min(255, [int]($p.B * 1.1 + 10)))
                $lightLogo.SetPixel($x, $y, $newColor)
            } else {
                # Dark charcoal text -> crisp white, retaining alpha
                $newColor = [System.Drawing.Color]::FromArgb($p.A, 255, 255, 255)
                $lightLogo.SetPixel($x, $y, $newColor)
            }
        }
    }
}
$lightLogo.Save("$publicDir\logo-light.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $publicDir\logo-light.png ($cropW x $cropH)"

$rawLogoBmp.Dispose()
$croppedLogo.Dispose()
$lightLogo.Dispose()

# 4. Process Favicon & App Icons
$rawFavBmp = New-Object System.Drawing.Bitmap($srcFavicon)

# Center the mark in a 512x512 square with high quality resampling
function CreateResizedSquare($srcBmp, $targetSize) {
    $destBmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # Content in source is x: 8..525 (w: 518), y: 118..446 (h: 329)
    # Source center: cx = 266.5, cy = 282
    # Let's draw centered
    $destAspect = $targetSize / 555.0
    $destW = [int]($srcBmp.Width * $destAspect)
    $destH = [int]($srcBmp.Height * $destAspect)
    $offsetX = [int](($targetSize - $destW) / 2)
    $offsetY = [int](($targetSize - $destH) / 2)

    $destRect = New-Object System.Drawing.Rectangle($offsetX, $offsetY, $destW, $destH)
    $g.DrawImage($srcBmp, $destRect)
    $g.Dispose()
    return $destBmp
}

# Create 512x512
$icon512 = CreateResizedSquare $rawFavBmp 512
$icon512.Save("$publicDir\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Save("$publicDir\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Save("$appDir\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved icon.png (512x512)"

# Create 180x180 for Apple touch icon
$icon180 = CreateResizedSquare $rawFavBmp 180
$icon180.Save("$publicDir\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon180.Save("$appDir\apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved apple-touch-icon.png (180x180)"

# Create 32x32 & 16x16
$icon32 = CreateResizedSquare $rawFavBmp 32
$icon32.Save("$publicDir\favicon-32x32.png", [System.Drawing.Imaging.ImageFormat]::Png)

$icon16 = CreateResizedSquare $rawFavBmp 16
$icon16.Save("$publicDir\favicon-16x16.png", [System.Drawing.Imaging.ImageFormat]::Png)

$icon48 = CreateResizedSquare $rawFavBmp 48
$icon48.Save("$publicDir\favicon-48x48.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Generate proper multi-icon .ico (containing 16x16, 32x32, 48x48)
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)

# ICO header: 0, 1 (icon), 3 images
$bw.Write([uint16]0)
$bw.Write([uint16]1)
$bw.Write([uint16]3)

$images = @($icon16, $icon32, $icon48)
$pngBytesList = @()

foreach ($img in $images) {
    $imgMs = New-Object System.IO.MemoryStream
    $img.Save($imgMs, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $imgMs.ToArray()
    $imgMs.Dispose()
    $pngBytesList += ,$bytes
}

$headerSize = 6 + (16 * $images.Count)
$currentOffset = $headerSize

for ($i = 0; $i -lt $images.Count; $i++) {
    $img = $images[$i]
    $bytes = $pngBytesList[$i]

    $bw.Write([byte]$img.Width)   # width
    $bw.Write([byte]$img.Height)  # height
    $bw.Write([byte]0)            # palette colors (0 if >=8bpp)
    $bw.Write([byte]0)            # reserved
    $bw.Write([uint16]1)          # color planes
    $bw.Write([uint16]32)         # bpp
    $bw.Write([uint32]$bytes.Length) # data size
    $bw.Write([uint32]$currentOffset) # offset
    $currentOffset += $bytes.Length
}

foreach ($bytes in $pngBytesList) {
    $bw.Write($bytes)
}

$bw.Flush()
[System.IO.File]::WriteAllBytes("$publicDir\favicon.ico", $ms.ToArray())
$bw.Dispose()
$ms.Dispose()
Write-Host "Saved valid multi-resolution $publicDir\favicon.ico"

$rawFavBmp.Dispose()
$icon512.Dispose()
$icon180.Dispose()
$icon48.Dispose()
$icon32.Dispose()
$icon16.Dispose()

Write-Host "Asset processing complete!"
