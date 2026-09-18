Add-Type -AssemblyName System.IO.Compression.FileSystem
$testZip = "D:\react\satya-id-screening\test_rezip.pptx"
if (Test-Path $testZip) { Remove-Item $testZip -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory("D:\react\satya-id-screening\template_unzipped", $testZip)
Write-Output ("Test rezip size: " + (Get-Item $testZip).Length)

$ppt = New-Object -ComObject PowerPoint.Application
try {
    $pres = $ppt.Presentations.Open($testZip, -1, 0, 0)
    Write-Output ("Pure rezip opened! Slide count: " + $pres.Slides.Count)
    $pres.Close()
} catch {
    Write-Error ("COM Error on pure rezip: " + $_.Exception.Message)
} finally {
    $ppt.Quit()
}
