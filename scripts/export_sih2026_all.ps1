# Export both 6-slide and 7-slide decks to PDF and slide image renders
$ErrorActionPreference = "Stop"

$decks = @(
    @{
        Pptx = "D:\react\satya-id-screening\SIH2026-IDEA-Presentation-SATYA-ID-6slides.pptx"
        Pdf = "D:\react\satya-id-screening\SIH2026-IDEA-Presentation-SATYA-ID-6slides.pdf"
        AltPdf = "D:\react\satya-id-screening\SIH2026-IDEA-Presentation-SATYA-ID.pdf"
        DownloadPdf = "C:\Users\Sachin\Downloads\SIH2026-IDEA-Presentation-SATYA-ID-6slides.pdf"
        PublicPdf = "D:\react\satya-id-screening\public\SIH2026-IDEA-Presentation-SATYA-ID-6slides.pdf"
        Renders = "D:\react\satya-id-screening\slide_renders_6slides"
    },
    @{
        Pptx = "D:\react\satya-id-screening\SIH2026-IDEA-Presentation-SATYA-ID-7slides-with-prototype.pptx"
        Pdf = "D:\react\satya-id-screening\SIH2026-IDEA-Presentation-SATYA-ID-7slides-with-prototype.pdf"
        AltPdf = "D:\react\satya-id-screening\SIH2026-IDEA-Presentation-SATYA-ID-with-prototype.pdf"
        DownloadPdf = "C:\Users\Sachin\Downloads\SIH2026-IDEA-Presentation-SATYA-ID-7slides-with-prototype.pdf"
        PublicPdf = "D:\react\satya-id-screening\public\SIH2026-IDEA-Presentation-SATYA-ID-7slides-with-prototype.pdf"
        Renders = "D:\react\satya-id-screening\slide_renders_7slides"
    }
)

Write-Host "Initializing Microsoft PowerPoint COM object..."
$ppt = New-Object -ComObject PowerPoint.Application

try {
    foreach ($deck in $decks) {
        $pptxPath = $deck.Pptx
        $pdfPath = $deck.Pdf
        $renderDir = $deck.Renders

        if (-not (Test-Path $renderDir)) { New-Item -ItemType Directory -Path $renderDir -Force | Out-Null }
        Write-Host "Opening: $pptxPath"

        $pres = $null
        try {
            $pres = $ppt.Presentations.Open($pptxPath, -1, 0, 0)
        } catch {
            $pres = $ppt.Presentations.Open($pptxPath, -1, 0, -1)
        }

        Write-Host "Opened successfully. Slide count: $($pres.Slides.Count)"

        # 1. Export slide images
        for ($i = 1; $i -le $pres.Slides.Count; $i++) {
            $slide = $pres.Slides.Item($i)
            $imgPath = Join-Path $renderDir ("slide_" + $i + ".png")
            if (Test-Path $imgPath) { Remove-Item $imgPath -Force }
            $slide.Export($imgPath, "PNG", 1920, 1080)
            Write-Host "Exported Slide $i to $imgPath"
        }

        # 2. Export PDF (Format 32 = ppSaveAsPDF)
        if (Test-Path $pdfPath) { Remove-Item $pdfPath -Force }
        Write-Host "Saving PDF to: $pdfPath"
        $pres.SaveAs($pdfPath, 32)
        $fileSize = (Get-Item $pdfPath).Length
        Write-Host "Exported PDF successfully! Size: $fileSize bytes"

        $pres.Close()

        # Copy to aliases
        $altLeaf = Split-Path $deck.AltPdf -Leaf
        Copy-Item $pdfPath -Destination $deck.AltPdf -Force
        Copy-Item $pdfPath -Destination $deck.DownloadPdf -Force
        Copy-Item $pdfPath -Destination $deck.PublicPdf -Force
        Copy-Item $pdfPath -Destination (Join-Path "C:\Users\Sachin\Downloads" $altLeaf) -Force
        Copy-Item $pdfPath -Destination (Join-Path "D:\react\satya-id-screening\public" $altLeaf) -Force
        Write-Host "Replicated PDF to Downloads and public"
    }
    Write-Host "All presentations and PDFs exported successfully!"
} catch {
    Write-Error ("COM Error: " + $_.Exception.Message)
} finally {
    $ppt.Quit()
}
