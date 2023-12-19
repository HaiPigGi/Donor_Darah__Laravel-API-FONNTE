<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use TCPDF;
use App\Models\akseptor_model;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;
use setasign\fpdi\FPDI;
use setasign\Fpdi\TcpdfFpdi;
class laporanController extends Controller
{
    
public function generatePdfAllAkseptor()
{
    $token = JWTAuth::getToken();

    $user = JWTAuth::toUser($token);

    // Check if the user exists
    if (!$user) {
        return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
    }

    $akseptors = akseptor_model::all();
    $pdf = $this->createPdf($akseptors);

    // Save the PDF to a temporary file
    $pdfFolderPath = storage_path('app/temp');
    $pdfPath = $pdfFolderPath . '/all_akseptors.pdf';

    // Create the 'app/temp' directory if it doesn't exist
    if (!File::exists($pdfFolderPath)) {
        File::makeDirectory($pdfFolderPath, 0755, true);
    }

    $pdf->Output($pdfPath, 'F');

    // Provide a downloadable link to the client
    return response()->download($pdfPath)->deleteFileAfterSend(true);
}


public function generatePdfVerifiedAkseptor()
{
    $token = JWTAuth::getToken();
    $user = JWTAuth::toUser($token);

    // Check if the user exists
    if (!$user) {
        return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
    }

    // Retrieve data for verified Akseptors
    $verifiedAkseptors = akseptor_model::where('status', 'verifikasi')->get();

    // Generate PDF with additional columns
    $pdf = $this->createPdf($verifiedAkseptors, true);

    // Save the PDF to a temporary file
    $pdfFolderPath = storage_path('app/temp');
    $pdfPath = $pdfFolderPath . '/verified_akseptors.pdf';

    // Create the 'app/temp' directory if it doesn't exist
    if (!File::exists($pdfFolderPath)) {
        File::makeDirectory($pdfFolderPath, 0755, true);
    }

    // Output PDF to the temporary file
    $pdf->Output($pdfPath, 'F');

    // Provide a downloadable link to the client
    return response()->download($pdfPath)->deleteFileAfterSend(true);
}

private function createPdf($akseptors, $includeAdditionalColumns = false)
{
    $pdf = new TCPDF();
    $pdf->SetMargins(15, 15, 15);
    $pdf->AddPage();

    $html = '<h1>Data Akseptor</h1>';
    $html .= '<table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #3498db; color: #fff;">
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Telepon</th>
                        <th>Golongan Darah</th>
                        <th>Jumlah Kantong</th>
                        <th>Kelurahan</th>
                        <th>Alamat</th>
                        <th>Tujuan Pengajuan</th>
                        <th>Status</th>
                        <th>Waktu</th>';

    // Include additional columns if specified
    if ($includeAdditionalColumns) {
        $html .= '<th>Verification Date</th>
                   <th>Eligible to Donate</th>';
    }

    $html .= '</tr></thead><tbody>';

    foreach ($akseptors as $akseptor) {
        // Get the verification date if available
        $verificationDate = $akseptor->created_at ?? '';

        // Check if verified status is eligible to donate
        $isEligible = $this->isEligibleToDonate($verificationDate);

        $html .= '<tr style="background-color: #ecf0f1;">
                    <td style="padding: 5px;">' . $akseptor->id . '</td>
                    <td style="padding: 5px;">' . $akseptor->nama . '</td>
                    <td style="padding: 5px;">' . $akseptor->telepon . '</td>
                    <td style="padding: 5px;">' . $akseptor->golongan_darah . '</td>
                    <td style="padding: 5px;">' . $akseptor->jumlah_kantong . '</td>
                    <td style="padding: 5px;">' . json_decode($akseptor->kelurahan)->nama . '</td>
                    <td style="padding: 5px;">' . $akseptor->alamat . '</td>
                    <td style="padding: 5px;">' . $akseptor->tujuan_Pengajuan . '</td>
                    <td style="padding: 5px;">' . $akseptor->status . '</td>
                    <td style="padding: 5px;">' . $akseptor->created_at. '</td>';

        // Include additional columns if specified
        if ($includeAdditionalColumns) {
            $html .= '<td style="padding: 5px;">' . $verificationDate . '</td>
                       <td style="padding: 5px;">' . ($isEligible ? 'Yes' : 'No') . '</td>';
        }

        $html .= '</tr>';
    }

    $html .= '</tbody></table>';
    $pdf->writeHTML($html, true, false, true, false, '');

    return $pdf;
}

/**
 * Check if the verified status is eligible to donate based on the verification date.
 *
 * @param string $verificationDate
 * @return bool
 */
private function isEligibleToDonate($verificationDate)
{
    // Check if the verification date is set and is more than 3 months ago
    if ($verificationDate && strtotime($verificationDate) < strtotime('-3 months')) {
        return true;
    }

    return false;
}
    
}
