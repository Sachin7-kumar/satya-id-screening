param(
    [string]$targetPath = "D:\react\satya-id-screening\SIH2025-IDEA-Presentation-SATYA-ID.pptx",
    [string]$outDir = "D:\react\satya-id-screening\slide_renders",
    [string]$pdfPath = "D:\react\satya-id-screening\SIH2025-IDEA-Presentation-SATYA-ID.pdf"
)

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

Write-Output ("Exporting slides & PDF from: " + $targetPath)
$ppt = New-Object -ComObject PowerPoint.Application
try {
    $pres = $null
    try {
        $pres = $ppt.Presentations.Open($targetPath, -1, 0, 0)
    } catch {
        $pres = $ppt.Presentations.Open($targetPath, -1, 0, -1)
    }
    
    Write-Output ("Opened presentation. Slide count: " + $pres.Slides.Count)

    # 1. Export slide images
    for ($i = 1; $i -le $pres.Slides.Count; $i++) {
        $slide = $pres.Slides.Item($i)
        $imgPath = Join-Path $outDir ("slide_" + $i + ".png")
        if (Test-Path $imgPath) { Remove-Item $imgPath -Force }
        $slide.Export($imgPath, "PNG", 1920, 1080)
        Write-Output ("Exported Slide " + $i + " to " + $imgPath)
    }

    # 2. Export PDF (Format 32 = ppSaveAsPDF)
    if (Test-Path $pdfPath) { Remove-Item $pdfPath -Force }
    Write-Output ("Exporting PDF to: " + $pdfPath)
    $pres.SaveAs($pdfPath, 32)
    Write-Output ("Exported PDF successfully! Size: " + (Get-Item $pdfPath).Length + " bytes")

    $pres.Close()
    Write-Output "Done exporting slides & PDF!"
} catch {
    Write-Error ("COM Exception: " + $_.Exception.Message)
} finally {
    $ppt.Quit()
}
