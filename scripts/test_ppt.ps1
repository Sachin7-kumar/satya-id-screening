$pptPath = "C:\Users\Sachin\Downloads\SIH2025-IDEA-Presentation-SATYA-ID.pptx"
try {
    $ppt = New-Object -ComObject PowerPoint.Application
    Write-Output "PowerPoint COM object available!"
    $pres = $ppt.Presentations.Open($pptPath, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    Write-Output ("Successfully opened presentation! Slide count: " + $pres.Slides.Count)
    $pres.Close()
    $ppt.Quit()
} catch {
    Write-Output ("Error testing PowerPoint: " + $_.Exception.Message)
}
