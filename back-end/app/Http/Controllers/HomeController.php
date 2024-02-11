<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function save($login){
        try {

            $user_data = Http::get('https://api.github.com/users/'.$login);

            if($user_data->getStatusCode() == 200){

                file_put_contents($login.'-profile.json', json_encode($user_data->json()));

                $repository_data = Http::get('https://api.github.com/users/'.$login.'/repos');

                if($repository_data->getStatusCode() == 200){
                    file_put_contents($login.'-repositorys.json', json_encode($repository_data->json()));
                }

                return response()->json([
                    'message' => 'Informações de '.$login.' salvas com sucesso!',
                    'body' => [
                        'user'=>$user_data->json(),
                        'repositorys'=>$repository_data->json(),
                    ]
                ], 200);
            }

            return response()->json([
                'message' => 'ok',
                'body' => null
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'body' => null
            ], 500);
        }
    }
}
